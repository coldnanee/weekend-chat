import type { Request, Response, NextFunction } from "express";

import SessionService from "./session.service";

class SessionController {
	async getSessions(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req;

			const { sessionId } = req.cookies as { sessionId: string };

			const sessions = await SessionService.getSessions(userId, sessionId);

			return res.json({ sessions });
		} catch (e) {
			next(e);
		}
	}
}

export default new SessionController();
