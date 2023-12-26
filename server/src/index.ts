import { config } from "dotenv";
config({ path: "./config/.env" });

import {
	sendMessageHandler,
	disconnectHandler,
	startTypingMessageHandler,
	endTypingMessageHandler,
	deleteChatHandler,
	deleteMessageHandler,
	logoutHandler,
	editMessageHandler,
	pinChatHandler,
	unpinChatHandler,
	blockUserHandler,
	unblockUserHandler
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

import { handshakeSocket } from "./libs";

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
app.use("/", router);
app.use(errorsMiddleware);
app.use("/", express.static("__static"));

const start = async () => {
	try {
		const server = http.createServer(app);

		const io = new Server(server, {
			cors: {
				origin: CLIENT_URL
			},
			path: "/ws"
		});

		server.listen(PORT);

		const onlineUsers = new Map<string, string>();

		const usersSessions = new Map<string, string[]>();

		io.on("connection", (socket) => {
			handshakeSocket(socket);

			const user = connectionQueryWrapper(socket.handshake.query.user);
			const session = connectionQueryWrapper(socket.handshake.query.session);

			onlineUsers.set(socket.id, user);
			if (!usersSessions.get(session)) {
				usersSessions.set(session, [socket.id]);
			} else {
				usersSessions.get(session)?.push(socket.id);
			}

			io.emit("new-online-user", Array.from(onlineUsers.values()));

			sendMessageHandler(io, socket, usersSessions); // ?
			startTypingMessageHandler(io, socket, usersSessions);
			endTypingMessageHandler(io, socket, usersSessions);
			disconnectHandler(io, socket, onlineUsers, usersSessions);
			deleteChatHandler(io, socket, usersSessions);
			deleteMessageHandler(io, socket, usersSessions);
			logoutHandler(io, socket, usersSessions);
			editMessageHandler(io, socket, usersSessions); // ?
			pinChatHandler(io, socket, usersSessions);
			unpinChatHandler(io, socket, usersSessions);
			blockUserHandler(io, socket, usersSessions);
			unblockUserHandler(io, socket, usersSessions);
		});

		await connectDB();
	} catch (e) {
		console.log(e); // eslint-disable-line no-console
	}
};

start();
