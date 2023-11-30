import type { Socket, Server } from "socket.io";

import { connectionQueryWrapper, getKeyByValueMap } from "../../libs";

import ChatsService from "../../chats/chats.service";

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

			const recipientSocketId = getKeyByValueMap(users, recipientId);

			const userId = connectionQueryWrapper(socket.handshake.query.user);

			const isMessageRead = !!usersIntoChats.get(recipientId);

			const messageBody = await ChatsService.saveMessageToDb(
				userId,
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
				: io.to(socket.id).emit("send-message", messageBody?.newMessage);
		}
	);
};
