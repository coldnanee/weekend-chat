import { Schema, model } from "mongoose";

import type { TChat } from "../../types";

const chat = new Schema<TChat>({
	members: { type: [String], default: [] },
	messages: { type: [String], default: [] },
	isPinned: { type: Boolean, default: false }
});

export default model<TChat>("Chat", chat);
