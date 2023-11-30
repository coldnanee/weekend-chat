import type { Socket, Server } from "socket.io";

import ChatModel from "../../db/models/ChatModel";
import UserModel from "../../db/models/UserModel";
import MessageModel from "../../db/models/MessageModel";
import { connectionQueryWrapper, getKeyByValueMap } from "../../libs";

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

		const { members, messages } = chat;

		const recipientId = members.find((id) => id !== userId);

		if (!recipientId) {
			return;
		}

		const deleteUsersChat = members.map(async (userId) => {
			const user = await UserModel.findById(userId);

			if (!user) {
				return;
			}

			const updatedChats = user.chats.filter((chat) => chat !== chatId);

			user.chats = updatedChats;

			await user.save();
		});

		await MessageModel.deleteMany({ _id: { $in: messages } });
		await ChatModel.deleteOne({ _id: chatId });
		await Promise.all(deleteUsersChat);

		const recipientSocketId = getKeyByValueMap(onlineUsers, recipientId);

		if (recipientSocketId) {
			io.to(recipientSocketId).emit("delete-chat-client", { chatId });
		}

		io.to(socket.id).emit("delete-chat-client", { chatId });
	});
};
