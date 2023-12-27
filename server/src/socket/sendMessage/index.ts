import type { Socket, Server } from "socket.io";

import { connectionQueryWrapper } from "../../libs";

import SessionModel from "../../db/models/SessionModel";

import ChatsService from "../../chats/chats.service";

import type { TSocketCbError } from "../../types";

import { checkAuthSocket } from "../../libs";

import SessionService from "../../session/session.service";
import UserModel from "../../db/models/UserModel";

export const sendMessageHandler = (
	io: Server,
	socket: Socket,
	usersSessions: Map<string, string[]>
) => {
	socket.on(
		"send-message",
		async (
			data: { recipientId: string; message: string },
			accessJwt: string,
			cb: TSocketCbError
		) => {
			try {
				const isAuth = checkAuthSocket(accessJwt, cb);

				if (!isAuth) {
					return;
				}

				const { recipientId, message } = data;

				const myId = connectionQueryWrapper(socket.handshake.query.user);

				const user = await UserModel.findById(myId);
				const recipient = await UserModel.findById(recipientId);

				if (user?.blackList.includes(recipientId)) {
					return cb({ status: 400, message: "User is blocked" });
				}

				if (recipient?.blackList.includes(myId)) {
					return cb({ status: 400, message: "You're blocked" });
				}

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
					SessionService.emitEventForEachSession(
						io,
						recipientSessions,
						usersSessions,
						{
							name: "new-chat",
							data: messageBody.recipientDto
						}
					);
				} else {
					SessionService.emitEventForEachSession(
						io,
						recipientSessions,
						usersSessions,
						{
							name: "get-message",
							data: messageBody?.newMessage
						}
					);
				}

				if (messageBody?.myDto) {
					SessionService.emitEventForEachSession(
						io,
						mySessions,
						usersSessions,
						{
							name: "new-chat",
							data: messageBody.myDto
						}
					);
				} else {
					SessionService.emitEventForEachSession(
						io,
						mySessions,
						usersSessions,
						{
							name: "send-message-client",
							data: messageBody?.newMessage
						}
					);
				}
			} catch (e) {
				cb({ status: 500, message: "Unexpected error" });
			}
		}
	);
};
