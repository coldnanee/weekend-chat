import type { Server, Socket } from "socket.io";
import ChatModel from "../../db/models/ChatModel";

import { connectionQueryWrapper } from "../../libs";
import SessionModel from "../../db/models/SessionModel";

import { checkAuthSocket } from "../../libs";

export const pinChatHandler = (
	io: Server,
	socket: Socket,
	usersSessions: Map<string, string[]>
) => {
	socket.on(
		"pin-chat",
		async (
			data: { chatId: string },
			accessJwt: string,
			cb: (err: { status: number; message: string }) => void
		) => {
			try {
				const isAuth = checkAuthSocket(accessJwt, cb);

				if (!isAuth) {
					return;
				}

				const { chatId } = data;

				const user = connectionQueryWrapper(socket.handshake.query.user);

				const chat = await ChatModel.findById(chatId);

				if (!chat) {
					return cb({ status: 400, message: "Chat not found" });
				}

				const sessions = await SessionModel.find({ user });

				chat.isPinned = true;

				await chat.save();

				sessions.map((s) => {
					const sessionSocketId = usersSessions.get(s._id.toString());
					if (sessionSocketId) {
						io.to(sessionSocketId).emit("pin-chat-client", chatId);
					}
				});
			} catch (e) {
				return cb({ status: 400, message: "Unexpected error" });
			}
		}
	);
};
