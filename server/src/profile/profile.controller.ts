import type { Request, Response, NextFunction } from "express";

import ProfileService from "./profile.service";

import { getValidationError } from "../libs";

import { ApiError } from "../errors";

class ProfileController {
	async updateProfile(req: Request, res: Response, next: NextFunction) {
		try {
			getValidationError(req);

			const { login, password, avatar } = req.body as {
				login: string;
				password: string;
				avatar: string;
			};

			if (password && password.length < 8) {
				throw ApiError.badRequestError(`Password can't be smaller 8 symbols`);
			}

			const id = req.userId;

			const user = await ProfileService.updateProfile(
				login.toLowerCase(),
				password,
				avatar,
				id
			);

			return res.json({ ...user });
		} catch (e) {
			next(e);
		}
	}
}

export default new ProfileController();
