import type { Request, Response, NextFunction } from "express";

import AuthService from "./auth.service";

import { getValidationError } from "../libs";
import { detect } from "detect-browser";

import type { TBrowserInfo } from "../types";

import { authResetPasswordHtml } from "./auth.html";
import { ApiError } from "../errors";

class AuthController {
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { login, password } = req.body as {
				login: string;
				password: string;
			};

			getValidationError(req);

			const browserInfo = detect(req.headers["user-agent"]) as TBrowserInfo;

			const { tokens, sessionId } = await AuthService.login(
				login.toLowerCase(),
				password,
				browserInfo
			);

			res
				.cookie("accessJwt", tokens.accessToken, {
					maxAge: 60 * 60 * 1000
				})
				.cookie("refreshJwt", tokens.refreshToken, {
					httpOnly: true,
					maxAge: 30 * 24 * 60 * 60 * 1000
				})
				.cookie("sessionId", sessionId, {
					httpOnly: true,
					maxAge: 30 * 24 * 60 * 60 * 1000
				});

			return res.status(200).send();
		} catch (e) {
			next(e);
		}
	}

	async registration(req: Request, res: Response, next: NextFunction) {
		try {
			getValidationError(req);

			const { login, password } = req.body as {
				login: string;
				password: string;
			};

			await AuthService.registration(login.toLowerCase(), password);

			return res.json({ message: true });
		} catch (e) {
			next(e);
		}
	}

	async sendResetMessage(req: Request, res: Response, next: NextFunction) {
		try {
			const { email } = req.body as { email: string };

			if (!email) {
				throw ApiError.badRequestError("Email is empty");
			}

			const isSend = await AuthService.sendResetMessage(email);

			if (!isSend) {
				throw ApiError.badRequestError("The email has not been sent");
			}

			return res.status(200).send();
		} catch (e) {
			next(e);
		}
	}

	async resetPassword(req: Request, res: Response, next: NextFunction) {
		try {
			const { link } = req.params;

			await AuthService.resetPassword(link);

			return res.send(authResetPasswordHtml);
		} catch (e) {
			next(e);
		}
	}
}

export default new AuthController();
