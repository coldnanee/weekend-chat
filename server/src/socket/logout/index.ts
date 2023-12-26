import type { Server, Socket } from "socket.io";

import { checkAuthSocket } from "../../libs";

import type { TSocketCbError } from "../../types";

export const logoutHandler = (
	io: Server,
	socket: Socket,
	usersSessions: Map<string, string[]>
) => {
	socket.on(
		"logout",
		(data: { sessionsId: string[] }, accessJwt: string, cb: TSocketCbError) => {
			try {
				const isAuth = checkAuthSocket(accessJwt, cb);

				if (!isAuth) {
					return;
				}

				const { sessionsId } = data;

				sessionsId.map((s) => {
					const socketId = usersSessions.get(s);
					if (socketId) {
						io.to(socketId).emit("logout-client");
						usersSessions.delete(s);
					}
				});
			} catch (e) {
				cb({ status: 500, message: "Unexpected error" });
			}
		}
	);
};
