import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors";
import TokenService from "./token.service";

import { detect } from "detect-browser";
import { TBrowserInfo } from "../types";

class TokenController {
	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshJwt, sessionId } = req.cookies as {
				refreshJwt: string;
				sessionId: string;
			};

			if (!refreshJwt || sessionId) {
				return res
					.status(401)
					.clearCookie("refreshJwt")
					.clearCookie("accessJwt")
					.clearCookie("sessionId")
					.json({ message: "You unauthorized" });
			}

			const result = await TokenService.removeTokenFromDb(refreshJwt);

			if (!result) {
				throw ApiError.unAuthorizedError();
			}

			res.clearCookie("refreshJwt");
			res.clearCookie("accessJwt");
			res.clearCookie("sessionId");

			return res.json({ message: result });
		} catch (e) {
			next(e);
		}
	}

	async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshJwt, sessionId } = req.cookies as {
				refreshJwt: string;
				sessionId: string;
			};

			if (!refreshJwt || !sessionId) {
				return res
					.status(401)
					.clearCookie("refreshJwt")
					.clearCookie("accessJwt")
					.clearCookie("sessionId")
					.json({ message: "You unauthorized" });
			}

			const browserInfo = detect(req.headers["user-agent"]) as TBrowserInfo;

			const data = await TokenService.refreshToken(
				sessionId,
				refreshJwt,
				browserInfo
			);

			if (!data) {
				return res
					.clearCookie("refreshJwt")
					.clearCookie("accessJwt")
					.clearCookie("sessionId")
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
