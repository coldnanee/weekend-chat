import type { Server, Socket } from "socket.io";
import ChatModel from "../../db/models/ChatModel";

import { connectionQueryWrapper, getKeyByValueMap } from "../../libs";
import SessionModel from "../../db/models/SessionModel";

export const pinChatHandler = (
	io: Server,
	socket: Socket,
	usersSessions: Map<string, string>
) => {
	socket.on("pin-chat", async (chatId) => {
		const user = connectionQueryWrapper(socket.handshake.query.user);

		const chat = await ChatModel.findById(chatId);

		if (!chat) {
			return;
		}

		const sessions = await SessionModel.find({ user });

		chat.isPinned = true;

		await chat.save();

		sessions.map((s) => {
			const sessionSocketId = getKeyByValueMap(usersSessions, s._id);
			if (sessionSocketId) {
				io.to(sessionSocketId).emit("pin-chat-client", chatId);
			}
		});
	});
};
