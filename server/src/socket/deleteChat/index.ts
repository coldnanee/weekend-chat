import type { Socket, Server } from "socket.io";

import ChatModel from "../../db/models/ChatModel";
import UserModel from "../../db/models/UserModel";
import MessageModel from "../../db/models/MessageModel";
import { connectionQueryWrapper, getKeyByValueMap } from "../../libs";

import ChatsService from "../../chats/chats.service";

export const deleteChatHandler = (
	io: Server,
	socket: Socket,
	onlineUsers: Map<string, string>
) => {
	socket.on("delete-chat", async (chatId: string) => {
		const userId = connectionQueryWrapper(socket.handshake.query.user);

		const chat = await ChatModel.findById(chatId);

		if (!chat) {
			return;
		}

		const recipientId = chat.members.find((id) => id !== userId);

		if (!recipientId) {
			return;
		}

		await ChatsService.deleteChat(chatId);

		const recipientSocketId = getKeyByValueMap(onlineUsers, recipientId);

		if (recipientSocketId) {
			io.to(recipientSocketId).emit("delete-chat-client", { chatId });
		}

		io.to(socket.id).emit("delete-chat-client", { chatId });
	});
};
