import type { Socket, Server } from "socket.io";

import MessageModel from "../../db/models/MessageModel";
import ChatModel from "../../db/models/ChatModel";

import type { TSocketCbError } from "../../types";

import { connectionQueryWrapper } from "../../libs";

import ChatsService from "../../chats/chats.service";
import SessionModel from "../../db/models/SessionModel";

import SessionService from "../../session/session.service";

import { checkAuthSocket } from "../../libs";

export const deleteMessageHandler = (
	io: Server,
	socket: Socket,
	usersSessions: Map<string, string[]>
) => {
	socket.on(
		"delete-message",
		async (
			data: { chatId: string; selectedMessages: string[] },
			accessJwt: string,
			cb: TSocketCbError
		) => {
			try {
				const isAuth = checkAuthSocket(accessJwt, cb);

				if (!isAuth) {
					return;
				}

				const { chatId, selectedMessages } = data;

				const myId = connectionQueryWrapper(socket.handshake.query.user);

				const chat = await ChatModel.findById(chatId);

				if (!chat) {
					return cb({ status: 400, message: "Chat not found" });
				}

				const recipientId = chat?.members.find((m) => m !== myId) || "";

				const messagesBody = await MessageModel.find({
					_id: { $in: selectedMessages }
				});

				const filteredIdMessages: string[] = [];

				if (!messagesBody) {
					return cb({ status: 400, message: "Message not found" });
				}

				messagesBody.map((m) => {
					const id = m._id.toString();
					if (selectedMessages.includes(id) && m.user.toString() === myId) {
						filteredIdMessages.push(id);
					}
				});

				const isChatDelete = chat.messages.length === filteredIdMessages.length;

				const updatedMessages = chat.messages.filter(
					(m) => !filteredIdMessages.includes(m)
				);

				chat.messages = updatedMessages;

				await chat.save();

				const recipientSessions = await SessionModel.find({
					user: recipientId
				});
				const mySessions = await SessionModel.find({ user: myId });

				if (isChatDelete) {
					await ChatsService.deleteChat(chatId);

					SessionService.emitEventForEachSession(
						io,
						mySessions,
						usersSessions,
						{
							name: "delete-chat-client",
							data: {
								chatId: chat?._id
							}
						}
					);
					SessionService.emitEventForEachSession(
						io,
						recipientSessions,
						usersSessions,
						{
							name: "delete-chat-client",
							data: {
								chatId: chat?._id
							}
						}
					);
				} else {
					await MessageModel.deleteMany({
						_id: { $in: selectedMessages }
					});

					SessionService.emitEventForEachSession(
						io,
						mySessions,
						usersSessions,
						{
							name: "delete-message-client",
							data: {
								chatId: chat?._id,
								messagesId: filteredIdMessages
							}
						}
					);
					SessionService.emitEventForEachSession(
						io,
						recipientSessions,
						usersSessions,
						{
							name: "delete-message-client",
							data: {
								chatId: chat?._id,
								messagesId: filteredIdMessages
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
