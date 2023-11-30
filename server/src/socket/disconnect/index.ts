import type { Socket, Server } from "socket.io";
import { connectionQueryWrapper } from "../../libs";

export const disconnectHandler = (
	io: Server,
	socket: Socket,
	onlineUsers: Map<string, string>,
	usersIntoChats: Map<string, string>
) => {
	socket.on("disconnect", () => {
		const userId = connectionQueryWrapper(socket.handshake.query.user);

		if (userId) {
			usersIntoChats.delete(userId);
		}

		onlineUsers.delete(socket.id);
		io.emit("new-offline-user", Array.from(onlineUsers.values()));
	});
};
