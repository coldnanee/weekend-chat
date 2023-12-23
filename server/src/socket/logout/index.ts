import type { Server, Socket } from "socket.io";

export const logoutHandler = (
	io: Server,
	socket: Socket,
	usersSessions: Map<string, string>
) => {
	socket.on("logout", (sessionsId: string[]) => {
		try {
			sessionsId.map((s) => {
				const socketId = usersSessions.get(s);
				if (socketId) {
					io.to(socketId).emit("logout-client");
					usersSessions.delete(s);
				}
			});
		} catch (e) {
			io.emit("error-client", e);
		}
	});
};
