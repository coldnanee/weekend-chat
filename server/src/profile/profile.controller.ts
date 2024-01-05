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

	async updateProfileSettings(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req;

			const { language } = req.body as { language: string };

			if (!language) {
				ApiError.badRequestError("Language is empty");
			}

			await ProfileService.updateProfileSettings(userId, language);

			return res.status(200).send();
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

	async deleteProfile(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req;

			const { password } = req.body as { password: string };

			await ProfileService.deleteProfile(userId, password);
		} catch (e) {
			next(e);
		}
	}

	async getBlacklist(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req;

			const users = await ProfileService.getBlacklist(userId);

			return res.json(users);
		} catch (e) {
			next(e);
		}
	}

	async blockUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req;

			const { user } = req.body as { user: string };

			if (!user) {
				throw ApiError.badRequestError("UserId is empty");
			}

			await ProfileService.blockUser(userId, user);

			res.status(200).send();
		} catch (e) {
			next(e);
		}
	}

	async unblockUser(req: Request, res: Response, next: NextFunction) {
		try {
			const { userId } = req;

			const { user } = req.body as { user: string };

			if (!user) {
				throw ApiError.badRequestError("UserId is empty");
			}

			await ProfileService.unblockUser(userId, user);

			res.status(200).send();
		} catch (e) {
			next(e);
		}
	}
}

export default new ProfileController();
