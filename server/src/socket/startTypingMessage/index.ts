import { connectionQueryWrapper } from "./../../libs";
import type { Socket, Server } from "socket.io";

import SessionModel from "../../db/models/SessionModel";

import { checkAuthSocket } from "./../../libs";

export const startTypingMessageHandler = (
	io: Server,
	socket: Socket,
	usersSessions: Map<string, string>
) => {
	socket.on(
		"start-typing",
		async (data: { recipientId: string }, accessJwt: string) => {
			try {
				const { recipientId } = data;

				const isAuth = checkAuthSocket(
					socket,
					{
						name: "start-typing",
						data
					},
					accessJwt
				);

				console.log("start", isAuth);

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
						io.to(sessionSocketId).emit("start-typing-client", userId);
					}
				});
			} catch (e) {
				io.emit("error-client", e);
			}
		}
	);
};
