import type { Request, Response, NextFunction } from "express";

import { ApiError } from "./";
import { _logger } from "./logger";

export const errorsMiddleware = (
	err: ApiError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof ApiError) {
		const { status, message } = err;
		_logger.error(message);

		if (status == 401) {
			return res
				.clearCookie("refreshJwt")
				.clearCookie("accessJwt")
				.clearCookie("sessionId")
				.status(status)
				.json({ message });
		}

		return res.status(status).json({ message });
	} else {
		return res.status(500).json({ message: "Unexpected error" });
	}
};
