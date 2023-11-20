import { Schema, model } from "mongoose";

import { TMessage } from "../../types";

const message = new Schema<TMessage>({
	text: { type: String, required: true },
	date: { type: String, required: true },
	user: { type: Schema.Types.ObjectId, ref: "User" }
});

export default model<TMessage>("Message", message);
