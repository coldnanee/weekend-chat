import { config } from "dotenv";
config({ path: "./config/.env" });

import {
	sendMessageHandler,
	disconnectHandler,
	readMessageHandler,
	startTypingMessageHandler,
	endTypingMessageHandler
} from "./socket";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { Server } from "socket.io";

import { connectionQueryWrapper } from "./libs";

import { connectDB } from "./db";

import http from "http";

import { errorsMiddleware } from "./errors";
import { router } from "./router";

import { v2 as cloudinary } from "cloudinary";

import { checkAuthForSocket } from "./libs";

const { CLIENT_URL, CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET_KEY, PORT } =
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

		server.listen(PORT);

		let onlineUsers = new Map<string, string>();

		io.on("connection", (socket) => {
			checkAuthForSocket(socket);

			onlineUsers.set(
				socket.id,
				connectionQueryWrapper(socket.handshake.query.user)
			);

			io.emit("new-online-user", Array.from(onlineUsers.values()));

			sendMessageHandler(io, socket, onlineUsers);
			readMessageHandler(io, socket);
			startTypingMessageHandler(io, socket, onlineUsers);
			endTypingMessageHandler(io, socket, onlineUsers);
			disconnectHandler(io, socket, onlineUsers);
		});

		await connectDB();
	} catch (e) {
		console.log(e);
	}
};

start();
