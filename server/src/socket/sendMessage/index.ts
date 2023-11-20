import type { Socket, Server } from "socket.io";

import { connectionQueryWrapper, getSocketIdByUserId } from "../../libs";

import { ApiError } from "../../errors";
import ChatModel from "../../db/models/ChatModel";
import MessageModel from "../../db/models/MessageModel";

import { getDateForMessage } from "../../libs";

export const sendMessageHandler = (
	io: Server,
	socket: Socket,
	users: Map<string, string>
) => {
	socket.on(
		"send-message",
		async (data: { recipientId: string; message: string }) => {
			const { recipientId, message } = data;

			const recipientSocketId = getSocketIdByUserId(users, recipientId);

			if (recipientSocketId) {
				// пользователь онлайн - отправить сообщение и сохранить в бд

				const user = connectionQueryWrapper(socket.handshake.query.user);

				io.to(recipientSocketId).emit("get-message", {
					user,
					message
				});

				const date = getDateForMessage();

				const newMessage = new MessageModel({
					user,
					text: message,
					date
				});

				console.log(newMessage);

				// await newMessage.save();

				// const chat = await ChatModel.findOne({
				// 	membersList: { $all: [user, recipientId] }
				// });

				// if (!chat){
				//     const newChat = new ChatModel({
				//         members: [user, recipientId],
				//         messages: [newMessage]
				//     })
				// }
			}
		}
	);
};
