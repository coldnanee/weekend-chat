import type { Request, Response, NextFunction } from "express";

import AuthService from "./auth.service";

import { getValidationError } from "../libs";

class AuthController {
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { login, password } = req.body as {
				login: string;
				password: string;
			};

			getValidationError(req);

			const { tokens, profile } = await AuthService.login(
				login.toLowerCase(),
				password
			);

			res.cookie("accessJwt", tokens.accessToken, {
				httpOnly: true,
				maxAge: 60 * 60 * 1000
			});
			res.cookie("refreshJwt", tokens.refreshToken, {
				httpOnly: true,
				maxAge: 30 * 24 * 60 * 60 * 1000
			});

			return res.json({ ...profile });
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
}

export default new AuthController();
