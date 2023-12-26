import type { Socket, Server } from "socket.io";

import type { TSocketCbError } from "../../types";

import ChatModel from "../../db/models/ChatModel";
import { connectionQueryWrapper } from "../../libs";

import ChatsService from "../../chats/chats.service";
import SessionModel from "../../db/models/SessionModel";

import { checkAuthSocket } from "../../libs";

export const deleteChatHandler = (
	io: Server,
	socket: Socket,
	usersSessions: Map<string, string[]>
) => {
	socket.on(
		"delete-chat",
		async (data: { chatId: string }, accessJwt: string, cb: TSocketCbError) => {
			try {
				const isAuth = checkAuthSocket(accessJwt, cb);

				if (!isAuth) {
					return;
				}

				const { chatId } = data;

				const myId = connectionQueryWrapper(socket.handshake.query.user);

				const chat = await ChatModel.findById(chatId);

				if (!chat) {
					return cb({ status: 400, message: "Chat not found" });
				}

				const recipientId = chat.members.find((id) => id !== myId);

				if (!recipientId) {
					return cb({ status: 400, message: "Recipient not found" });
				}

				await ChatsService.deleteChat(chatId);

				const mySessions = await SessionModel.find({ user: myId });
				const recipientSessions = await SessionModel.find({
					user: recipientId
				});

				mySessions.map((s) => {
					const sessionSocketId = usersSessions.get(s._id.toString());
					if (sessionSocketId) {
						io.to(sessionSocketId).emit("delete-chat-client", { chatId });
					}
				});

				recipientSessions.map((s) => {
					const sessionSocketId = usersSessions.get(s._id.toString());
					if (sessionSocketId) {
						io.to(sessionSocketId).emit("delete-chat-client", { chatId });
					}
				});
			} catch (e) {
				cb({ status: 500, message: "Unexpected error" });
			}
		}
	);
};
