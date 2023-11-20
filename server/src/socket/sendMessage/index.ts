import type { Socket, Server } from "socket.io";

import { getSocketIdByUserId } from "../../libs";

import UserModel from "../../db/models/UserModel";

import { UserDto } from "../../dtos/user.dto";

import { ApiError } from "../../errors";
import ChatModel from "../../db/models/ChatModel";
import MessageModel from "../../db/models/MessageModel";

import { getDateForMessage } from "../../libs";

export const sendMessageHandler = (
	io: Server,
	socket: Socket,
	users: Map<string, string>,
	user: string
) => {
	socket.on(
		"send-message",
		async (data: { recipientId: string; message: string }) => {
			const { recipientId, message } = data;

			const recipientSocketId = getSocketIdByUserId(users, recipientId);

			if (recipientSocketId) {
				// пользователь онлайн - отправить сообщение и сохранить в бд

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
