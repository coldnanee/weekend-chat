import type { Request, Response, NextFunction } from "express";

import UsersService from "./users.service";

class UsersController {
	async getUsersByLogin(req: Request, res: Response, next: NextFunction) {
		try {
			const { login } = req.query as { login: string };

			if (!login) {
				return res.json({ users: [] });
			}

			const { userId } = req;

			const users = await UsersService.getUsersByLogin(
				login.toLowerCase(),
				userId
			);

			return res.json({ users });
		} catch (e) {
			next(e);
		}
	}
}

export default new UsersController();
