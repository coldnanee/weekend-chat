import jwt from "jsonwebtoken";

import { TUserPayload } from "../types";
import TokenModel from "../db/models/TokenModel";

import type { TUser } from "../types";
import { ApiError } from "../errors";
import UserModel from "../db/models/UserModel";
import { ProfileDto } from "../dtos/profile.dto";

class TokenService {
	generateTokens(user: TUserPayload): {
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
	async saveRefreshTokenToDb(user: string, refreshToken: string) {
		const tokenFromDb = await TokenModel.findOne({ user });
		if (tokenFromDb) {
			tokenFromDb.refreshToken = refreshToken;
			return tokenFromDb.save();
		}
		const token = new TokenModel({ user, refreshToken: refreshToken });
		return token.save();
	}

	async refreshToken(refreshToken: string) {
		const userId = this.validateRefreshToken(refreshToken);
		const tokenFromDb = await TokenModel.findOne({ refreshToken });

		if (!userId || !tokenFromDb) {
			return null;
		}

		const user = await UserModel.findById(userId);

		if (!user) {
			return null;
		}

		const userDto = new ProfileDto(user);

		const tokens = this.generateTokens(userDto);

		await this.saveRefreshTokenToDb(user._id, tokens.refreshToken);

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
		const result = await TokenModel.deleteOne({ refreshToken });
		return result.deletedCount > 0;
	}
}

export default new TokenService();
