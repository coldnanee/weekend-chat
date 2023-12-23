import type { Socket, Server } from "socket.io";

import ChatModel from "../../db/models/ChatModel";
import { connectionQueryWrapper, getKeyByValueMap } from "../../libs";

import ChatsService from "../../chats/chats.service";
import SessionModel from "../../db/models/SessionModel";

export const deleteChatHandler = (
	io: Server,
	socket: Socket,
	usersSessions: Map<string, string>
) => {
	socket.on("delete-chat", async (chatId: string) => {
		const myId = connectionQueryWrapper(socket.handshake.query.user);

		const chat = await ChatModel.findById(chatId);

		if (!chat) {
			return;
		}

		const recipientId = chat.members.find((id) => id !== myId);

		if (!recipientId) {
			return;
		}

		await ChatsService.deleteChat(chatId);

		const mySessions = await SessionModel.find({ user: myId });
		const recipientSessions = await SessionModel.find({ user: recipientId });

		mySessions.map((s) => {
			const sessionSocketId = getKeyByValueMap(usersSessions, s._id.toString());
			if (sessionSocketId) {
				io.to(sessionSocketId).emit("delete-chat-client", { chatId });
			}
		});

		recipientSessions.map((s) => {
			const sessionSocketId = getKeyByValueMap(usersSessions, s._id.toString());
			if (sessionSocketId) {
				io.to(sessionSocketId).emit("delete-chat-client", { chatId });
			}
		});
	});
};
