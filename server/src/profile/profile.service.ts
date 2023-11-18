import bcrypt from "bcrypt";
import UserModel from "../db/models/UserModel";
import { ApiError } from "../errors";

import { v2 as cloudinary } from "cloudinary";
import { ProfileDto } from "../dtos/profile.dto";

class ProfileService {
	async updateProfile(
		login: string,
		password: string,
		avatar: string,
		id: string
	) {
		const candidate = await UserModel.findById(id);

		if (!candidate) {
			throw ApiError.unAuthorizedError();
		}

		const hashPassword = await bcrypt.hash(password, 7);

		candidate.login = login;
		candidate.password = hashPassword;

		if (avatar) {
			await cloudinary.uploader.upload(
				avatar,
				{
					public_id: `${login}_avatar`,
					folder: process.env.CLOUD_FOLDER_IMAGES || ""
				},
				(error, result) => {
					const imageUrl = result?.secure_url;

					if (imageUrl) {
						candidate.avatar = imageUrl;
					} else {
						throw ApiError.badRequestError("Error upload avatar");
					}
				}
			);
		} else if (avatar == null) {
			candidate.avatar = "";
		}

		const result = await candidate.save();

		const profile = new ProfileDto(result);

		return profile;
	}
}

export default new ProfileService();
