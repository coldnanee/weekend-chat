import { Schema, model } from "mongoose";

import type { TSession } from "../../types";

const session = new Schema<TSession>({
	user: { type: Schema.Types.ObjectId, ref: "User" },
	refreshToken: { type: String, require: true, unique: true },
	browser: { type: String, require: true },
	os: { type: String, require: true }
});

export default model<TSession>("Session", session);
