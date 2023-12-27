import { TUserPayload } from "../types";

export class UserDto {
	public login: string;
	public _id: string;
	public avatar: string;
	public lastOnline: string;
	public isBlock?: boolean;
	constructor(profile: TUserPayload, myId?: string) {
		this._id = profile._id.toString();
		this.login = profile.login;
		this.avatar = profile.avatar;
		this.lastOnline = profile.lastOnline;
		if (myId) {
			this.isBlock = profile.blackList.includes(myId);
		}
	}
}
