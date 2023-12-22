import type { Server, Socket } from "socket.io";

import { getKeyByValueMap } from "../../libs";

export const logoutHandler = (
	io: Server,
	socket: Socket,
	usersSessions: Map<string, string>
) => {
	socket.on("logout", async (sessionsId: string[]) => {
		sessionsId.map((s) => {
			const socketId = getKeyByValueMap(usersSessions, s);

			if (socketId) {
				usersSessions.delete(socketId);
				io.to(socketId).emit("logout-client");
			}
		});
	});
};
