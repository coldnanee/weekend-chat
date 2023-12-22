import type { Socket, Server } from "socket.io";

export const disconnectHandler = (
	io: Server,
	socket: Socket,
	onlineUsers: Map<string, string>
) => {
	socket.on("disconnect", () => {
		onlineUsers.delete(socket.id);
		io.emit("new-offline-user", Array.from(onlineUsers.values()));
	});
};
