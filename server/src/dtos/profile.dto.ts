import { TProfilePayload } from "../types";

export class ProfileDto {
	public login: string;
	public _id: string;
	public avatar: string;
	public chatList: string[];
	constructor(profile: TProfilePayload) {
		this._id = profile._id;
		this.login = profile.login;
		this.avatar = profile.avatar;
		this.chatList = profile.chatList;
	}
}
