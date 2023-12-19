import type { Request, Response, NextFunction } from "express";

import ChatsService from "./chats.service";

class ChatsController {
	async getChats(req: Request, res: Response, next: NextFunction) {
		try {
			const { chat } = req.query as { chat: string };

			const { userId } = req;

			const chats = await ChatsService.getChats(chat, userId);

			return res.json({ chats });
		} catch (e) {
			console.log(e);
			next(e);
		}
	}

	async getUserInfo(req: Request, res: Response, next: NextFunction) {
		try {
			const { login } = req.query as { login: string };

			const user = await ChatsService.getUserInfo(login.toLowerCase());

			return res.json({ ...user });
		} catch (e) {
			next(e);
		}
	}
}

export default new ChatsController();
