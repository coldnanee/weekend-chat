import UserModel from "../db/models/UserModel";

import { ApiError } from "../errors";

import bcrypt from "bcrypt";

import TokenService from "../token/token.service";

import { ProfileDto } from "../dtos/profile.dto";

class AuthService {
	async login(
		login: string,
		password: string,
		browserInfo: {
			os: string;
			name: string;
			version: string;
			type: string;
		} | null
	): Promise<{
		tokens: { accessToken: string; refreshToken: string };
		sessionId: string;
	}> {
		const candidate = await UserModel.findOne({ login });

		if (!candidate) {
			throw new ApiError(400, "User not found");
		}

		const isPasswordValid = await bcrypt.compare(password, candidate.password);

		if (!isPasswordValid) {
			throw new ApiError(400, "Password is not valid");
		}

		const tokens = TokenService.generateTokens(new ProfileDto(candidate));

		const session = await TokenService.saveRefreshTokenToDb(
			"",
			tokens.refreshToken,
			browserInfo,
			candidate._id
		);

		return { tokens, sessionId: session._id.toString() };
	}

	async registration(login: string, password: string) {
		const candidate = await UserModel.findOne({ login });

		if (candidate) {
			throw new ApiError(400, "Login is busy");
		}

		const hashPassword = await bcrypt.hash(password, 7);

		const user = new UserModel({
			login,
			password: hashPassword
		});

		return user.save();
	}
}

export default new AuthService();
