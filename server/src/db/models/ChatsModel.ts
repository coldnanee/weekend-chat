import { Schema, model } from "mongoose";

import type { TChats } from "../../types";

const chats = new Schema<TChats>({
	chats: { type: [String], default: [] },
	pinnedChats: { type: [String], default: [] }
});

export default model<TChats>("Chats", chats);
