import type { Server, Socket } from "socket.io";

import MessageModel from "../../db/models/MessageModel";
import ChatModel from "../../db/models/ChatModel";

import { connectionQueryWrapper, getKeyByValueMap } from "../../libs";

export const editMessageHandler = (
	io: Server,
	socket: Socket,
	onlineUsers: Map<string, string>
) => {
	socket.on(
		"edit-message",
		async (data: { messageId: string; updateText: string }) => {
			const { messageId, updateText } = data;

			const myId = connectionQueryWrapper(socket.handshake.query.user);

			const message = await MessageModel.findById(messageId);

			if (!message) {
				return;
			}

			const chat = await ChatModel.findById(message.chat);

			if (!chat) {
				return;
			}

			if (myId === message.user.toString()) {
				const recipientId = chat.members.filter((m) => m !== myId).join("");

				const recipientSocketId =
					getKeyByValueMap(onlineUsers, recipientId) || "";

				message.text = updateText;
				message.isUpdated = true;

				await message.save();

				io.to(socket.id).emit("edit-message-client", {
					...data,
					chat: chat._id
				});
				io.to(recipientSocketId).emit("edit-message-client", {
					...data,
					chat: chat._id
				});
			}
		}
	);
};
