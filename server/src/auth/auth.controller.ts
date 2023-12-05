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

			const { accessToken, refreshToken } = await AuthService.login(
				login.toLowerCase(),
				password
			);

			res.cookie("accessJwt", accessToken, {
				httpOnly: true,
				maxAge: 60 * 60 * 1000
			});
			res.cookie("refreshJwt", refreshToken, {
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
}

export default new AuthController();
