import type { Socket, Server } from "socket.io";

import { connectionQueryWrapper, getKeyByValueMap } from "../../libs";

import ChatsService from "../../chats/chats.service";
import ChatModel from "../../db/models/ChatModel";

export const sendMessageHandler = (
	io: Server,
	socket: Socket,
	users: Map<string, string>,
	usersIntoChats: Map<string, string>
) => {
	socket.on(
		"send-message",
		async (data: { recipientId: string; message: string }) => {
			const { recipientId, message } = data;

			const myId = connectionQueryWrapper(socket.handshake.query.user);

			const chat = await ChatModel.findOne({
				members: { $all: [recipientId, myId] }
			});

			const recipientSocketId = getKeyByValueMap(users, recipientId);

			const isMessageRead = !!(
				chat?._id && usersIntoChats.get(recipientId) === chat?._id.toString()
			);

			const messageBody = await ChatsService.saveMessageToDb(
				myId,
				recipientId,
				message,
				isMessageRead
			);

			if (recipientSocketId) {
				messageBody?.newChat
					? io.to(recipientSocketId).emit("new-chat", messageBody.newChat)
					: io
							.to(recipientSocketId)
							.emit("get-message", messageBody?.newMessage);
			}

			messageBody?.newChat
				? io.to(socket.id).emit("new-chat", messageBody.newChat)
				: io.to(socket.id).emit("send-message-client", messageBody?.newMessage);
		}
	);
};
