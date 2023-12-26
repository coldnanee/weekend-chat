import { Schema, model } from "mongoose";

import { TUser } from "../../types";

const user = new Schema<TUser>({
	login: { type: String, require: true, unique: true },
	password: { type: String, require: true },
	avatar: { type: String, require: true },
	email: { type: String, require: true },
	chats: { type: [String], default: [] },
	lastOnline: { type: String, default: "" },
	blackList: { type: [String], default: [] }
});

export default model<TUser>("User", user);
