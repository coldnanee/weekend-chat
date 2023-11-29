import { connectionQueryWrapper } from "./../../libs";
import type { Socket, Server } from "socket.io";

import { getKeyByValueMap } from "../../libs";

export const startTypingMessageHandler = (
	io: Server,
	socket: Socket,
	onlineUsers: Map<string, string>
) => {
	socket.on("start-typing", (recipientId: string) => {
		const recipientSocketId = getKeyByValueMap(onlineUsers, recipientId);

		const userId = connectionQueryWrapper(socket.handshake.query.user);

		if (!recipientSocketId) {
			return;
		}

		io.to(recipientSocketId).emit("start-typing-client", userId);
	});
};
