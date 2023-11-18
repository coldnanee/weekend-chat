import type { Request, Response, NextFunction } from "express";

import ProfileService from "./profile.service";

class ProfileController {
	async updateProfile(req: Request, res: Response, next: NextFunction) {
		try {
			const { login, password, avatar } = req.body as {
				login: string;
				password: string;
				avatar: string;
			};

			const id = req.userId;

			const user = await ProfileService.updateProfile(
				login,
				password,
				avatar,
				id
			);

			return res.json({ ...user });
		} catch (e) {
			console.log(e);
			next(e);
		}
	}
}

export default new ProfileController();
