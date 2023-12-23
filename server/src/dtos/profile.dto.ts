import { TProfilePayload } from "../types";

export class ProfileDto {
	public login: string;
	public _id: string;
	public avatar: string;
	public chats: string[];
	public lastOnline: string;
	constructor(profile: TProfilePayload) {
		this._id = profile._id;
		this.login = profile.login;
		this.avatar = profile.avatar;
		this.chats = profile.chats;
		this.lastOnline = profile.lastOnline;
	}
}
