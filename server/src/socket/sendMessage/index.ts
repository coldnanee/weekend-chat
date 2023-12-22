import type { Socket, Server } from "socket.io";

import { connectionQueryWrapper, getKeyByValueMap } from "../../libs";

import ChatsService from "../../chats/chats.service";

export const sendMessageHandler = (
	io: Server,
	socket: Socket,
	users: Map<string, string>
) => {
	socket.on(
		"send-message",
		async (data: { recipientId: string; message: string }) => {
			const { recipientId, message } = data;

			const myId = connectionQueryWrapper(socket.handshake.query.user);

			const recipientSocketId = getKeyByValueMap(users, recipientId);

			const messageBody = await ChatsService.saveMessageToDb(
				myId,
				recipientId,
				message
			);

			if (recipientSocketId) {
				messageBody?.recipientDto
					? io.to(recipientSocketId).emit("new-chat", messageBody.recipientDto)
					: io
							.to(recipientSocketId)
							.emit("get-message", messageBody?.newMessage);
			}

			if (messageBody?.myDto) {
				io.to(socket.id).emit("new-chat", messageBody.myDto);
			} else {
				io.to(socket.id).emit("send-message-client", messageBody?.newMessage);
			}
		}
	);
};
