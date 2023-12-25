import { Schema, model } from "mongoose";

import type { TEmail } from "../../types";

const email = new Schema<TEmail>({
	email: { type: String, require: true },
	link: { type: String, require: true }
});

export default model<TEmail>("Email", email);
