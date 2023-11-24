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
			next(e);
		}
	}

	async getChatByLogin(req: Request, res: Response, next: NextFunction) {
		try {
			const chat = await ChatsService.getChatByLogin(
				req.userId,
				req.params.login
			);

			if ("recipientId" in chat) {
				return res.json({ recipientId: chat.recipientId });
			}

			return res.json({ chat });
		} catch (e) {
			next(e);
		}
	}
}

export default new ChatsController();
