import type { Server, Socket } from "socket.io";

import MessageModel from "../../db/models/MessageModel";
import ChatModel from "../../db/models/ChatModel";

import { connectionQueryWrapper } from "../../libs";
import SessionModel from "../../db/models/SessionModel";

import { checkAuthSocket } from "../../libs";

import type { TSocketCbError } from "../../types";

import SessionService from "../../session/session.service";

import UserModel from "../../db/models/UserModel";

export const editMessageHandler = (
	io: Server,
	socket: Socket,
	usersSessions: Map<string, string[]>
) => {
	socket.on(
		"edit-message",
		async (
			data: { messageId: string; updateText: string; recipientId: string },
			accessJwt: string,
			cb: TSocketCbError
		) => {
			try {
				const isAuth = checkAuthSocket(accessJwt, cb);

				if (!isAuth) {
					return;
				}

				const { messageId, updateText, recipientId } = data;

				const myId = connectionQueryWrapper(socket.handshake.query.user);

				const user = await UserModel.findById(myId);
				const recipient = await UserModel.findById(recipientId);

				if (user?.blackList.includes(recipientId)) {
					return cb({ status: 400, message: "User is blocked" });
				}

				if (recipient?.blackList.includes(myId)) {
					return cb({ status: 400, message: "You're blocked" });
				}

				const message = await MessageModel.findById(messageId);

				if (!message) {
					return cb({ status: 400, message: "Message not found" });
				}

				const chat = await ChatModel.findById(message.chat);

				if (!chat) {
					return cb({ status: 400, message: "Chat not found" });
				}

				if (myId === message.user.toString()) {
					const recipientId = chat.members.filter((m) => m !== myId).join("");

					const mySessions = await SessionModel.find({ user: myId });
					const recipientSessions = await SessionModel.find({
						user: recipientId
					});

					message.text = updateText;
					message.isUpdated = true;

					await message.save();

					SessionService.emitEventForEachSession(
						io,
						mySessions,
						usersSessions,
						{
							name: "edit-message-client",
							data: {
								...data,
								chat: chat._id
							}
						}
					);

					SessionService.emitEventForEachSession(
						io,
						recipientSessions,
						usersSessions,
						{
							name: "edit-message-client",
							data: {
								...data,
								chat: chat._id
							}
						}
					);
				}
			} catch (e) {
				cb({ status: 500, message: "Unexpected error" });
			}
		}
	);
};
