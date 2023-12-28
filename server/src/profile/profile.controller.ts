import type { Request, Response, NextFunction } from "express";

import ProfileService from "./profile.service";

import { getAccessJwt, getValidationError } from "../libs";

import { ApiError } from "../errors";

class ProfileController {
	async updateProfile(req: Request, res: Response, next: NextFunction) {
		try {
			getValidationError(req);

			const { login, password, avatar, email } = req.body as {
				login: string;
				password: string;
				avatar: string;
				email: string;
			};

			if (password && password.length < 8) {
				throw ApiError.badRequestError(`Password can't be smaller 8 symbols`);
			}

			const id = req.userId;

			const user = await ProfileService.updateProfile(
				login.toLowerCase(),
				password,
				avatar,
				id,
				email
			);

			return res.json({ ...user });
		} catch (e) {
			next(e);
		}
	}

	async getProfileSettings(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req;

			const settings = await ProfileService.getProfileSettings(userId);

			return res.json({ ...settings });
		} catch (e) {
			next(e);
		}
	}

	async getDictionaries(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = getAccessJwt(req);

			const lng = await ProfileService.getDictionaries(userId);

			return res.sendFile(lng);
		} catch (e) {
			next(e);
		}
	}
}

export default new ProfileController();
