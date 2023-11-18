import { TUserPayload } from "../types";

export class UserDto {
	public login: string;
	public _id: string;
	public avatar: string;
	constructor(profile: TUserPayload) {
		this._id = profile._id;
		this.login = profile.login;
		this.avatar = profile.avatar;
	}
}
