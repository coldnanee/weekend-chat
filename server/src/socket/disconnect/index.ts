import type { Socket, Server } from "socket.io";

import { connectionQueryWrapper } from "../../libs";

import UserModel from "../../db/models/UserModel";

export const disconnectHandler = (
	io: Server,
	socket: Socket,
	onlineUsers: Map<string, string>,
	usersSessions: Map<string, string[]>
) => {
	socket.on("disconnect", async () => {
		try {
			const sessionId = connectionQueryWrapper(socket.handshake.query.session);
			const myId = connectionQueryWrapper(socket.handshake.query.user);

			const profile = await UserModel.findById(myId);

			if (!profile) {
				return;
			}

			profile.lastOnline = new Date().toISOString();

			await profile.save();

			onlineUsers.delete(socket.id);

			const sessions = usersSessions.get(sessionId);

			if (sessions) {
				usersSessions.set(
					sessionId,
					sessions.filter((s) => s !== socket.id)
				);
			}

			io.emit("new-offline-user", Array.from(onlineUsers.values()));
		} catch (e) {
			console.log(e); // eslint-disable-line no-console
		}
	});
};
