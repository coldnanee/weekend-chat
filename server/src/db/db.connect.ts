import mongoose from "mongoose";

const { DB_URL } = process.env as {
	DB_URL: string;
};

export const connectDB = async () => {
	await mongoose.connect(DB_URL);
};
