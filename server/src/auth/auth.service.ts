import UserModel from "../db/models/UserModel";

import { ApiError } from "../errors";

import bcrypt from "bcrypt";

import TokenService from "../token/token.service";

import { ProfileDto } from "../dtos/profile.dto";

class AuthService {
	async login(
		login: string,
		password: string
	): Promise<{
		tokens: { accessToken: string; refreshToken: string };
		profile: ProfileDto;
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

		await TokenService.saveRefreshTokenToDb(candidate._id, tokens.refreshToken);

		const profile = new ProfileDto(candidate);

		return { tokens, profile };
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
