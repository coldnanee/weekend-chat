import { Schema, model } from "mongoose";

import { TUser } from "../../types";

const user = new Schema<TUser>({
	login: { type: String, require: true, unique: true },
	password: { type: String, require: true },
	avatar: { type: String, require: true },
	chatList: { type: [String], default: [] }
});

export default model<TUser>("User", user);
