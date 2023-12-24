import { connectionQueryWrapper } from "./../../libs";
import type { Server, Socket } from "socket.io";

import SessionModel from "../../db/models/SessionModel";

import { checkAuthSocket } from "./../../libs";

export const endTypingMessageHandler = (
	io: Server,
	socket: Socket,
	usersSessions: Map<string, string>
) => {
	socket.on(
		"stop-typing",
		async (data: { recipientId: string }, accessJwt: string) => {
			try {
				const { recipientId } = data;

				const isAuth = checkAuthSocket(
					socket,
					{
						name: "stop-typing",
						data
					},
					accessJwt
				);

				if (!isAuth) {
					return;
				}

				const userId = connectionQueryWrapper(socket.handshake.query.user);

				const recipientSessions = await SessionModel.find({
					user: recipientId
				});

				recipientSessions.map((s) => {
					const sessionSocketId = usersSessions.get(s._id.toString());
					if (sessionSocketId) {
						io.to(sessionSocketId).emit("stop-typing-client", userId);
					}
				});
			} catch (e) {
				io.emit("error-client", e);
			}
		}
	);
};
