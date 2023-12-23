import type { Socket, Server } from "socket.io";

import { connectionQueryWrapper } from "../../libs";

export const disconnectHandler = (
	io: Server,
	socket: Socket,
	onlineUsers: Map<string, string>,
	usersSessions: Map<string, string>
) => {
	socket.on("disconnect", () => {
		const sessionId = connectionQueryWrapper(socket.handshake.query.session);

		onlineUsers.delete(socket.id);
		usersSessions.delete(sessionId);
		io.emit("new-offline-user", Array.from(onlineUsers.values()));
	});
};
