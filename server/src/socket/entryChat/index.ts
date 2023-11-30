import type { Socket, Server } from "socket.io";
import { connectionQueryWrapper, getKeyByValueMap } from "../../libs";

import MessageModel from "../../db/models/MessageModel";
import ChatModel from "../../db/models/ChatModel";

export const entryChatHandler = (
	io: Server,
	socket: Socket,
	onlineUsers: Map<string, string>,
	usersIntoChats: Map<string, string>
) => {
	socket.on("entry-chat", async (chat: string) => {
		const user = connectionQueryWrapper(socket.handshake.query.user);

		const chatBody = await ChatModel.findById(chat);

		if (!chatBody) {
			return;
		}

		const { members } = chatBody;

		const recipientId = members.find((id) => id !== user);

		const recipientSocketId = getKeyByValueMap(onlineUsers, recipientId || "");

		const unreadMessages = await MessageModel.find({
			chat,
			isRead: false,
			user
		});

		const readMessages = unreadMessages.map(async (message) => {
			message.isRead = true;
			await message.save();
		});

		await Promise.all(readMessages);

		usersIntoChats.set(user, chat);

		if (recipientSocketId) {
			io.to(recipientSocketId).emit("entry-chat-client", {
				chatId: chat,
				userId: user
			});
		}
	});
};
