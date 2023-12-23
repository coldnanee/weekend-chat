import { connectionQueryWrapper } from "./../../libs";
import type { Server, Socket } from "socket.io";

import SessionModel from "../../db/models/SessionModel";

export const endTypingMessageHandler = (
	io: Server,
	socket: Socket,
	usersSessions: Map<string, string>
) => {
	socket.on("stop-typing", async (recipientId: string) => {
		const userId = connectionQueryWrapper(socket.handshake.query.user);

		const recipientSessions = await SessionModel.find({ user: recipientId });

		recipientSessions.map((s) => {
			const sessionSocketId = usersSessions.get(s._id.toString());
			if (sessionSocketId) {
				io.to(sessionSocketId).emit("stop-typing-client", userId);
			}
		});
	});
};
