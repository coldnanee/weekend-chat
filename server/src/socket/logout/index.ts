import type { Server, Socket } from "socket.io";

import { checkAuthSocket } from "../../libs";

export const logoutHandler = (
	io: Server,
	socket: Socket,
	usersSessions: Map<string, string>
) => {
	socket.on("logout", (data: { sessionsId: string[] }, accessJwt: string) => {
		try {
			const { sessionsId } = data;

			const isAuth = checkAuthSocket(
				socket,
				{ name: "logout", data },
				accessJwt
			);

			if (!isAuth) {
				return;
			}

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
