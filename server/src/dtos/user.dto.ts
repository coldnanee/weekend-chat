import { TUserPayload } from "../types";

export class UserDto {
	public login: string;
	public _id: string;
	public avatar: string;
	public lastOnline: string;
	public blackList: string[];
	constructor(profile: TUserPayload) {
		this._id = profile._id.toString();
		this.login = profile.login;
		this.avatar = profile.avatar;
		this.lastOnline = profile.lastOnline;
		this.blackList = profile.blackList;
	}
}
