import type { Socket, Server } from "socket.io";

import MessageModel from "../../db/models/MessageModel";
import ChatModel from "../../db/models/ChatModel";

import { connectionQueryWrapper } from "../../libs";

import ChatsService from "../../chats/chats.service";
import SessionModel from "../../db/models/SessionModel";

export const deleteMessageHandler = (
	io: Server,
	socket: Socket,
	usersSessions: Map<string, string>
) => {
	socket.on("delete-message", async (chatId: string, messagesId: string[]) => {
		const myId = connectionQueryWrapper(socket.handshake.query.user);

		const chat = await ChatModel.findById(chatId);

		if (!chat) {
			return;
		}

		const recipientId = chat?.members.find((m) => m !== myId) || "";

		const messagesBody = await MessageModel.find({ _id: { $in: messagesId } });

		const filteredIdMessages: string[] = [];

		if (!messagesBody) {
			return;
		}

		messagesBody.map((m) => {
			const id = m._id.toString();
			if (messagesId.includes(id) && m.user.toString() === myId) {
				filteredIdMessages.push(id);
			}
		});

		const isChatDelete = chat.messages.length === filteredIdMessages.length;

		const updatedMessages = chat.messages.filter(
			(m) => !filteredIdMessages.includes(m)
		);

		chat.messages = updatedMessages;

		await chat.save();

		const recipientSessions = await SessionModel.find({ user: recipientId });
		const mySessions = await SessionModel.find({ user: myId });

		if (isChatDelete) {
			await ChatsService.deleteChat(chatId);

			mySessions.map((s) => {
				const sessionSocketId = usersSessions.get(s._id.toString());
				if (sessionSocketId) {
					io.to(sessionSocketId).emit("delete-chat-client", {
						chatId: chat?._id
					});
				}
			});

			recipientSessions.map((s) => {
				const sessionSocketId = usersSessions.get(s._id.toString());
				if (sessionSocketId) {
					io.to(sessionSocketId).emit("delete-chat-client", {
						chatId: chat?._id
					});
				}
			});
		} else {
			await MessageModel.deleteMany({
				_id: { $in: messagesId }
			});
			mySessions.map((s) => {
				const sessionSocketId = usersSessions.get(s._id.toString());
				if (sessionSocketId) {
					io.to(sessionSocketId).emit("delete-message-client", {
						chatId: chat?._id,
						messagesId: filteredIdMessages
					});
				}
			});
			recipientSessions.map((s) => {
				const sessionSocketId = usersSessions.get(s._id.toString());
				if (sessionSocketId) {
					io.to(sessionSocketId).emit("delete-message-client", {
						chatId: chat?._id,
						messagesId: filteredIdMessages
					});
				}
			});
		}
	});
};
