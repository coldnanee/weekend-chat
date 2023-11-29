import type { Socket, Server } from "socket.io";

import { getSocketIdByUserId } from "../../libs";

export const startTypingMessageHandler = (
	io: Server,
	socket: Socket,
	onlineUsers: Map<string, string>
) => {
	socket.on("start-typing", (recipientId: string) => {
		const recipientSocketId = getSocketIdByUserId(onlineUsers, recipientId);

		if (!recipientSocketId) {
			return;
		}

		const userId = socket.handshake.query.user;

		io.to(recipientSocketId).emit("start-typing-client", userId);
	});
};
