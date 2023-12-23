import type { Server, Socket } from "socket.io";

import { connectionQueryWrapper } from "../../libs";

import SessionModel from "../../db/models/SessionModel";
import ChatModel from "../../db/models/ChatModel";

export const unpinChatHandler = (
	io: Server,
	socket: Socket,
	usersSessions: Map<string, string>
) => {
	socket.on("unpin-chat", async (chatId: string) => {
		const user = connectionQueryWrapper(socket.handshake.query.user);

		const chat = await ChatModel.findById(chatId);

		if (!chat) {
			return;
		}

		const sessions = await SessionModel.find({ user });

		chat.isPinned = false;

		await chat.save();

		sessions.map((s) => {
			const sessionSocketId = usersSessions.get(s._id.toString());
			if (sessionSocketId) {
				io.to(sessionSocketId).emit("unpin-chat-client", chatId);
			}
		});
	});
};
