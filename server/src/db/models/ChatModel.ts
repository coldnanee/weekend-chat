import { Schema, model } from "mongoose";

import type { TChat } from "../../types";

const chat = new Schema<TChat>({
	members: { type: [String], default: [] },
	messages: { type: [String], default: [] }
});

export default model<TChat>("Chat", chat);
