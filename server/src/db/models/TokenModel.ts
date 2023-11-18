import { Schema, model } from "mongoose";

type TToken = {
	user: Schema.Types.ObjectId;
	refreshToken: string;
};

const token = new Schema<TToken>({
	user: { type: Schema.Types.ObjectId, ref: "User" },
	refreshToken: { type: String, require: true }
});

export default model<TToken>("Token", token);
