import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { errorsMiddleware } from "../errors";
import { router } from "../router";
import { connectDB } from "../db";
import { Server } from "socket.io";

import http from "http";

import { v2 as cloudinary } from "cloudinary";

const { PORT, CLIENT_URL, CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET_KEY } =
	process.env as {
		PORT: string;
		CLIENT_URL: string;
		CLOUD_NAME: string;
		CLOUD_API_KEY: string;
		CLOUD_API_SECRET_KEY: string;
	};

cloudinary.config({
	cloud_name: CLOUD_NAME,
	api_key: CLOUD_API_KEY,
	api_secret: CLOUD_API_SECRET_KEY,
	secure: true
});

export const worker = () => {
	const app = express();
	const server = http.createServer(app);

	app.use(
		cors({
			credentials: true,
			origin: CLIENT_URL,
			allowedHeaders: "Content-Type"
		})
	);

	const io = new Server(server, {
		cors: {
			origin: CLIENT_URL
		}
	});

	app.use(cookieParser());
	app.use(express.json({ limit: "25mb" }));
	app.use(express.urlencoded({ limit: "25mb", extended: true }));
	app.use("/api", router);
	app.use(errorsMiddleware);

	const start = async () => {
		try {
			server.listen(PORT, () => {});

			io.on("connection", () => {
				console.log("connection!");
			});

			await connectDB();
		} catch (e) {
			console.log(e);
		}
	};

	start();
};
