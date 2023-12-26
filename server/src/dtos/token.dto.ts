import type { TTokenPayload } from "../types";

export class TokenDto {
	public _id: string;
	public login: string;

	constructor(user: TTokenPayload) {
		this._id = user._id;
		this.login = user.login;
	}
}
