import bcrypt from "bcrypt";
import UserModel from "../db/models/UserModel";
import { ApiError } from "../errors";

import { v2 as cloudinary } from "cloudinary";
import { ProfileDto } from "../dtos/profile.dto";
import Settings from "../db/models/SettingsModel";
import { SettingsDto } from "../dtos/settings.dto";

import path from "path";
import SettingsModel from "../db/models/SettingsModel";

class ProfileService {
	async updateProfile(
		login: string,
		password: string,
		avatar: string,
		id: string,
		email: string
	) {
		const candidate = await UserModel.findById(id);

		if (!candidate) {
			throw ApiError.unAuthorizedError();
		}

		if (password) {
			const hashPassword = await bcrypt.hash(password, 7);
			candidate.password = hashPassword;
		}

		candidate.login = login;
		candidate.email = email;

		if (avatar === "null") {
			await cloudinary.uploader.destroy(
				`weekend-chat/users/${login}_avatar`,
				(error, result) => {
					if (error) {
						throw ApiError.badRequestError(error);
					}
					if (result.result === "ok") {
						candidate.avatar = "";
					}
				}
			);
		} else if (avatar) {
			await cloudinary.uploader.upload(
				avatar,
				{
					public_id: `${login}_avatar`,
					folder: process.env.CLOUD_FOLDER_IMAGES || ""
				},
				(error, result) => {
					if (error) {
						throw ApiError.badRequestError(error?.message);
					}

					const imageUrl = result?.secure_url;

					if (imageUrl) {
						candidate.avatar = imageUrl;
					} else {
						throw ApiError.badRequestError("Error upload avatar");
					}
				}
			);
		}

		const result = await candidate.save();

		const profile = new ProfileDto(result);

		return profile;
	}

	async getProfileSettings(userId: string) {
		const settings = await Settings.findOne({ user: userId });

		if (!settings) {
			throw ApiError.unAuthorizedError();
		}

		const settingsDto = new SettingsDto(settings);

		return settingsDto;
	}

	async getDictionaries(userId: string | null) {
		const settings = await SettingsModel.findOne({ user: userId });

		const language = settings ? settings.language : "en";

		const filePath = path.resolve(
			__dirname,
			`../../__dictionaries/${language}.json`
		);

		return filePath;
	}
}

export default new ProfileService();
