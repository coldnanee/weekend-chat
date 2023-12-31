import jwt from "jsonwebtoken";

import SessionModel from "../db/models/SessionModel";

import type { TUser } from "../types";
import UserModel from "../db/models/UserModel";
import { ProfileDto } from "../dtos/profile.dto";
import type { TTokenPayload } from "../types";

import type { TBrowserInfo } from "../types";

import { getBrowserName } from "../libs/getBrowserName";

class TokenService {
	generateTokens(user: TTokenPayload): {
		accessToken: string;
		refreshToken: string;
	} {
		const accessToken = jwt.sign(
			{ user },
			process.env.JWT_ACCESS_SECRET ?? "",
			{
				expiresIn: "30s"
			}
		);

		const refreshToken = jwt.sign(
			{ user },
			process.env.JWT_REFRESH_SECRET ?? "",
			{
				expiresIn: "30d"
			}
		);

		return { accessToken, refreshToken };
	}
	async saveRefreshTokenToDb(
		sessionId: string,
		refreshToken: string,
		browserInfo: TBrowserInfo,
		user: string
	) {
		if (sessionId) {
			const tokenFromDb = await SessionModel.findById(sessionId);
			if (tokenFromDb) {
				tokenFromDb.refreshToken = refreshToken;
				return tokenFromDb.save();
			}
		}

		const session = new SessionModel({
			user,
			refreshToken,
			os: browserInfo?.os,
			browser: getBrowserName(browserInfo)
		});

		return session.save();
	}

	async refreshToken(
		sessionId: string,
		refreshToken: string,
		browserInfo: TBrowserInfo
	) {
		const userId = this.validateRefreshToken(refreshToken);
		const tokenFromDb = await SessionModel.findById(sessionId);

		if (!userId || !tokenFromDb) {
			return null;
		}

		const user = await UserModel.findById(userId);

		if (!user) {
			return null;
		}

		const userDto = new ProfileDto(user);

		const tokens = this.generateTokens(userDto);

		await this.saveRefreshTokenToDb(
			sessionId,
			tokens.refreshToken,
			browserInfo,
			user._id
		);

		return { tokens, user: userDto };
	}

	validateAccessToken(token: string): string | null {
		try {
			const { user } = jwt.verify(
				token,
				process.env.JWT_ACCESS_SECRET || ""
			) as { user: TUser };
			return user._id;
		} catch (e) {
			return null;
		}
	}

	validateRefreshToken(token: string): string | null {
		try {
			const { user } = jwt.verify(
				token,
				process.env.JWT_REFRESH_SECRET || ""
			) as { user: TUser };
			return user._id;
		} catch (e) {
			return null;
		}
	}

	async removeTokenFromDb(refreshToken: string) {
		const result = await SessionModel.deleteOne({ refreshToken });
		return result.deletedCount > 0;
	}
}

export default new TokenService();
