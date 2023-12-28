import { model, Schema } from "mongoose";

import type { TProfileSettings } from "../../types";

const settings = new Schema<TProfileSettings>({
	language: { type: String, default: "en" },
	user: { type: Schema.Types.ObjectId, ref: "User", require: true }
});

export default model<TProfileSettings>("Settings", settings);
