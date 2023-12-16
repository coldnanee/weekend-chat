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
		const myId = connectionQueryWrapper(socket.handshake.query.user);

		const chatBody = await ChatModel.findById(chat);

		if (!chatBody) {
			return;
		}

		const recipientId = chatBody.members.find((id) => id !== myId) || "";

		const recipientSocketId = getKeyByValueMap(onlineUsers, recipientId);

		const unreadMessages = await MessageModel.find({
			chat,
			isRead: false,
			user: recipientId
		});

		const readMessages = unreadMessages.map(async (message) => {
			message.isRead = true;
			await message.save();
		});

		await Promise.all(readMessages);

		usersIntoChats.set(myId, chat);

		if (recipientSocketId) {
			io.to(recipientSocketId).emit("entry-chat-client", {
				chatId: chat,
				userId: myId
			});
		}
	});
};
