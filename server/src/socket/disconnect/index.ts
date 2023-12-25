import type { Socket, Server } from "socket.io";

import { connectionQueryWrapper } from "../../libs";

import UserModel from "../../db/models/UserModel";

import { getIsoDate } from "../../libs";

export const disconnectHandler = (
	io: Server,
	socket: Socket,
	onlineUsers: Map<string, string>,
	usersSessions: Map<string, string>
) => {
	socket.on("disconnect", async () => {
		try {
			const sessionId = connectionQueryWrapper(socket.handshake.query.session);
			const myId = connectionQueryWrapper(socket.handshake.query.user);

			const profile = await UserModel.findById(myId);

			if (!profile) {
				return;
			}

			profile.lastOnline = getIsoDate();

			await profile.save();

			onlineUsers.delete(socket.id);
			usersSessions.delete(sessionId);
			io.emit("new-offline-user", Array.from(onlineUsers.values()));
		} catch (e) {
			console.log(e); // eslint-disable-line no-console
		}
	});
};
