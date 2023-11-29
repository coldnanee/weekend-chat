import { connectionQueryWrapper } from "./../../libs";
import type { Server, Socket } from "socket.io";

import { getKeyByValueMap } from "./../../libs";

export const endTypingMessageHandler = (
	io: Server,
	socket: Socket,
	onlineUsers: Map<string, string>
) => {
	socket.on("stop-typing", (recipientId: string) => {
		const userId = connectionQueryWrapper(socket.handshake.query.user);

		const recipientSocketId = getKeyByValueMap(onlineUsers, recipientId);

		if (!recipientSocketId) {
			return;
		}

		io.to(recipientSocketId).emit("stop-typing-client", userId);
	});
};
