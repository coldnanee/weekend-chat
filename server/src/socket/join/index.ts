import type { Socket, Server } from "socket.io";

export const joinHandler = (
	io: Server,
	socket: Socket,
	onlineUsers: Map<string, string>,
	cb: (user: string) => void
) => {
	socket.on("join", (user: string) => {
		if (!onlineUsers.has(socket.id)) {
			cb(user);
			onlineUsers.set(socket.id, user);
			io.emit("new-online-user", Array.from(onlineUsers.values()));
		}
	});
};
