import UserModel from "../db/models/UserModel";

import { ApiError } from "../errors";

import bcrypt from "bcrypt";

import TokenService from "../token/token.service";

import { ProfileDto } from "../dtos/profile.dto";

import EmailModel from "../db/models/EmailModel";

import { v4 as uuid } from "uuid";

import MailerService from "../mailer";

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

	async sendResetMessage(email: string) {
		const user = await UserModel.findOne({ email });

		if (!user) {
			throw ApiError.badRequestError("Email not found");
		}

		const link = uuid();

		const candidate = await EmailModel.findOne({ email });

		if (!candidate) {
			const emailBody = new EmailModel({ email, link });
			await emailBody.save();
		} else {
			candidate.link = link;
			await candidate.save();
		}

		const info = await MailerService.sendMailToUser(
			email,
			`<span>For reset password<span/> <a href=${process.env.SERVER_URL}/auth/reset/${link}>click here</a>`,
			"Reset password"
		);

		return info;
	}

	async resetPassword(link: string) {
		const email = await EmailModel.findOne({ link });
		if (!email) {
			throw ApiError.badRequestError("Link is not valid");
		}

		const user = await UserModel.findOne({ email: email.email });

		if (!user) {
			throw ApiError.badRequestError("User not found");
		}

		const newPassword = uuid();

		const newHashPassword = await bcrypt.hash(newPassword, 7);

		user.password = newHashPassword;

		await EmailModel.deleteOne({ email: email.email });

		const info = await MailerService.sendMailToUser(
			email.email,
			`<p>New password: <span>${newPassword}<span/><p>`,
			"New password"
		);

		if (info) {
			return user.save();
		}
	}
}

export default new AuthService();
