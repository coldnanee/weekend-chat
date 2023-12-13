import { Schema, model } from "mongoose";

type TSession = {
	user: Schema.Types.ObjectId;
	refreshToken: string;
	sessionId: string;
	browser: string;
	os: string;
};

const session = new Schema<TSession>({
	user: { type: Schema.Types.ObjectId, ref: "User" },
	refreshToken: { type: String, require: true, unique: true },
	sessionId: { type: String, require: true, unique: true },
	browser: { type: String, require: true },
	os: { type: String, require: true }
});

export default model<TSession>("Session", session);
