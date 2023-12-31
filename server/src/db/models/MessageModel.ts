import { Schema, model } from "mongoose";

import { TMessage } from "../../types";

const message = new Schema<TMessage>({
	text: { type: String, required: true },
	date: { type: String, required: true },
	user: { type: Schema.Types.ObjectId, ref: "User" },
	chat: { type: Schema.Types.ObjectId, ref: "Chat" },
	isUpdated: { type: Schema.Types.Boolean, default: false }
});

export default model<TMessage>("Message", message);
