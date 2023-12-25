import type { Socket, Server } from "socket.io";

import { connectionQueryWrapper } from "../../libs";

import SessionModel from "../../db/models/SessionModel";

import ChatsService from "../../chats/chats.service";

import { checkAuthSocket } from "../../libs";

export const sendMessageHandler = (
	io: Server,
	socket: Socket,
	usersSessions: Map<string, string>
) => {
	socket.on(
		"send-message",
		async (
			data: { recipientId: string; message: string },
			accessJwt: string,
			cb: (obj: { status: number; message: string }) => void
		) => {
			try {
				const isAuth = checkAuthSocket(accessJwt, cb);

				if (!isAuth) {
					return;
				}

				const { recipientId, message } = data;

				const myId = connectionQueryWrapper(socket.handshake.query.user);

				const messageBody = await ChatsService.saveMessageToDb(
					myId,
					recipientId,
					message
				);

				const mySessions = await SessionModel.find({ user: myId });
				const recipientSessions = await SessionModel.find({
					user: recipientId
				});

				if (messageBody?.recipientDto) {
					recipientSessions.map((s) => {
						const sessionSocketId = usersSessions.get(s._id.toString());
						if (sessionSocketId) {
							io.to(sessionSocketId).emit("new-chat", messageBody.recipientDto);
						}
					});
				} else {
					recipientSessions.map((s) => {
						const sessionSocketId = usersSessions.get(s._id.toString());
						if (sessionSocketId) {
							io.to(sessionSocketId).emit(
								"get-message",
								messageBody?.newMessage
							);
						}
					});
				}

				if (messageBody?.myDto) {
					mySessions.map((s) => {
						const sessionSocketId = usersSessions.get(s._id.toString());
						if (sessionSocketId) {
							io.to(sessionSocketId).emit("new-chat", messageBody.myDto);
						}
					});
				} else {
					mySessions.map((s) => {
						const sessionSocketId = usersSessions.get(s._id.toString());
						if (sessionSocketId) {
							io.to(sessionSocketId).emit(
								"send-message-client",
								messageBody?.newMessage
							);
						}
					});
				}
			} catch (e) {
				cb({ status: 500, message: "Unexpected error" });
			}
		}
	);
};
