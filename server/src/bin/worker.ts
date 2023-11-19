import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { Server } from "socket.io";

import { connectDB } from "../db";

import http from "http";

import { errorsMiddleware } from "../errors";
import { router } from "../router";

import { v2 as cloudinary } from "cloudinary";

import { createAdapter } from "@socket.io/cluster-adapter";

import { setupWorker } from "@socket.io/sticky";

const { CLIENT_URL, CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET_KEY } =
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

	app.use(
		cors({
			credentials: true,
			origin: CLIENT_URL,
			allowedHeaders: "Content-Type"
		})
	);

	app.use(cookieParser());
	app.use(express.json({ limit: "25mb" }));
	app.use(express.urlencoded({ limit: "25mb", extended: true }));
	app.use("/api", router);
	app.use(errorsMiddleware);

	const start = async () => {
		try {
			const server = http.createServer(app);

			const io = new Server(server, {
				cors: {
					origin: CLIENT_URL
				}
			});

			io.adapter(createAdapter());

			setupWorker(io);

			io.on("connection", (socket) => {});

			await connectDB();
		} catch (e) {
			console.log(e);
		}
	};

	start();
};
