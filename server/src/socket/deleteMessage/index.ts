import { getKeyByValueMap } from "./../../libs/getKeyByValueMap/index";
import type { Socket, Server } from "socket.io";

import MessageModel from "../../db/models/MessageModel";
import ChatModel from "../../db/models/ChatModel";

import { connectionQueryWrapper } from "../../libs";

import ChatsService from "../../chats/chats.service";

export const deleteMessageHandler = (
	io: Server,
	socket: Socket,
	onlineUsers: Map<string, string>
) => {
	socket.on("delete-message", async (chatId: string, messagesId: string[]) => {
		const myId = connectionQueryWrapper(socket.handshake.query.user);

		const chat = await ChatModel.findById(chatId);

		if (!chat) {
			return;
		}

		const recipientId = chat?.members.find((m) => m !== myId) || "";

		const recipientSocketId = getKeyByValueMap(onlineUsers, recipientId);

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

		if (isChatDelete) {
			await ChatsService.deleteChat(chatId);

			io.to(socket.id).emit("delete-chat-client", {
				chatId: chat?._id
			});
			if (recipientSocketId) {
				io.to(recipientSocketId).emit("delete-chat-client", {
					chatId: chat?._id
				});
			}
		} else {
			await MessageModel.deleteMany({
				_id: { $in: messagesId }
			});
			io.to(socket.id).emit("delete-message-client", {
				chatId: chat?._id,
				messagesId: filteredIdMessages
			});
			if (recipientSocketId) {
				io.to(recipientSocketId).emit("delete-message-client", {
					chatId: chat?._id,
					messagesId: filteredIdMessages
				});
			}
		}
	});
};
