import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors";
import TokenService from "./token.service";

class TokenController {
	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshJwt } = req.cookies as { refreshJwt: string };

			if (!refreshJwt) {
				throw ApiError.unAuthorizedError();
			}

			const result = await TokenService.removeTokenFromDb(refreshJwt);

			if (!result) {
				throw ApiError.unAuthorizedError();
			}

			res.clearCookie("refreshJwt");
			res.clearCookie("accessJwt");

			return res.json({ message: result });
		} catch (e) {
			next(e);
		}
	}

	async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshJwt } = req.cookies as { refreshJwt: string };

			if (!refreshJwt) {
				throw ApiError.unAuthorizedError();
			}

			const data = await TokenService.refreshToken(refreshJwt);

			if (!data) {
				return res
					.clearCookie("refreshJwt")
					.clearCookie("accessJwt")
					.status(400)
					.send();
			}

			res.cookie("accessJwt", data.tokens.accessToken, {
				httpOnly: true,
				maxAge: 30 * 24 * 60 * 60 * 1000
			});

			res.cookie("refreshJwt", data.tokens.refreshToken, {
				httpOnly: true,
				maxAge: 30 * 24 * 60 * 60 * 1000
			});

			return res.json({ ...data.user });
		} catch (e) {
			next(e);
		}
	}
}

export default new TokenController();
