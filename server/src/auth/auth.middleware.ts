import type { Request, Response, NextFunction } from "express";

import { ApiError } from "../errors";
import TokenService from "../token/token.service";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
	try {
		const { accessJwt } = req.cookies as { accessJwt: string };

		if (!accessJwt) {
			return next(ApiError.unAuthorizedError());
		}

		const id = TokenService.validateAccessToken(accessJwt);

		if (!id) {
			return next(ApiError.unAuthorizedError());
		}

		req.userId = id;

		next();
	} catch (e) {
		return next(ApiError.unAuthorizedError());
	}
};
