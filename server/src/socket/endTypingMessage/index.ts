import { connectionQueryWrapper } from "./../../libs";
import type { Server, Socket } from "socket.io";

import SessionModel from "../../db/models/SessionModel";

import { checkAuthSocket } from "./../../libs";

import type { TSocketCbError } from "../../types";

import SessionService from "../../session/session.service";

export const endTypingMessageHandler = (
	io: Server,
	socket: Socket,
	usersSessions: Map<string, string[]>
) => {
	socket.on(
		"stop-typing",
		async (
			data: { recipientId: string },
			accessJwt: string,
			cb: TSocketCbError
		) => {
			try {
				const isAuth = checkAuthSocket(accessJwt, cb);

				if (!isAuth) {
					return;
				}
				const { recipientId } = data;

				const userId = connectionQueryWrapper(socket.handshake.query.user);

				const recipientSessions = await SessionModel.find({
					user: recipientId
				});

				SessionService.emitEventForEachSession(
					io,
					recipientSessions,
					usersSessions,
					{
						name: "stop-typing-client",
						data: {
							userId
						}
					}
				);
			} catch (e) {
				cb({ status: 500, message: "Unexpected error" });
			}
		}
	);
};
