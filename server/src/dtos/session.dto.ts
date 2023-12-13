import type { TSession } from "../types";

export class SessionDto {
	public _id: string;
	public browser: string;
	public os: string;
	public isThisDevice: boolean;

	constructor(session: TSession, sessionId: string) {
		this._id = session._id;
		this.browser = session.browser;
		this.os = session.os;
		this.isThisDevice = session._id === sessionId;
	}
}
