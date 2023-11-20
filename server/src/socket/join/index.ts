import type { Socket, Server } from "socket.io";

import { connectionQueryWrapper } from "../../libs";

export const joinHandler = (
	io: Server,
	socket: Socket,
	onlineUsers: Map<string, string>
) => {
	socket.on("join", () => {
		if (!onlineUsers.has(socket.id)) {
			console.log(connectionQueryWrapper(socket.handshake.query.user));

			onlineUsers.set(
				socket.id,
				connectionQueryWrapper(socket.handshake.query.user)
			);
			io.emit("new-online-user", Array.from(onlineUsers.values()));
		}
	});
};
