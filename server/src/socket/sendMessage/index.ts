import type { Socket, Server } from "socket.io";

import { connectionQueryWrapper, getSocketIdByUserId } from "../../libs";

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

			const recipientSocketId = getSocketIdByUserId(users, recipientId);

			const userId = connectionQueryWrapper(socket.handshake.query.user);

			const newMessage = await ChatsService.saveMessageToDb(
				userId,
				recipientId,
				message
			);

			if (recipientSocketId) {
				io.to(recipientSocketId).emit("get-message", newMessage);
			}

			io.to(socket.id).emit("send-message", newMessage);
		}
	);
};
