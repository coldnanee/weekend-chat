import UserModel from "../db/models/UserModel";

import { TUser } from "../types";

import { ApiError } from "../errors";

import { UserDto } from "../dtos/user.dto";

class UsersService {
	async getUsersByLogin(login: string, user: string): Promise<UserDto[]> {
		const profile = await UserModel.findById(user);

		if (!profile) {
			throw ApiError.unAuthorizedError();
		}

		const users = await UserModel.find({
			login: { $regex: login, $options: "i" }
		});

		const usersDto = users.map((user) => new UserDto(user));

		const filteredUsers = usersDto.filter(
			(user) => user._id !== profile._id.toString() // toString() т.к. по факту _id ObjectId тип
		);

		return filteredUsers.slice(0, 5);
	}
}

export default new UsersService();
