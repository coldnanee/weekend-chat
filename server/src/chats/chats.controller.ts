import type { Request, Response, NextFunction } from "express";

import { getValidationError } from "../libs";
import ChatsService from "./chats.service";

class ChatsController {
	async getChats(req: Request, res: Response, next: NextFunction) {
		try {
			const { chat } = req.query as { chat: string };

			const { userId } = req;

			const chats = await ChatsService.getChats(chat, userId);

			return res.json({ chats });
		} catch (e) {
			next(e);
		}
	}

	async getUserInfo(req: Request, res: Response, next: NextFunction) {
		try {
			getValidationError(req);
			const { login } = req.query as { login: string };

			const { userId } = req;

			const user = await ChatsService.getUserInfo(login.toLowerCase(), userId);

			return res.json({ ...user });
		} catch (e) {
			next(e);
		}
	}
}

export default new ChatsController();
