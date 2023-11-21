import { getDateForMessage } from "../libs";

import MessageModel from "../db/models/MessageModel";
import ChatModel from "../db/models/ChatModel";
import UserModel from "../db/models/UserModel";
import { TChat, TMessage } from "../types";
import { ApiError } from "../errors";

class ChatsService {
	async getChats(chat: string, userId: string) {
		// chat - буква логина человека

		// 1. найти всех людей у которых в логине содержится chat [x]
		// 2. по очереди подставить id в массив вместе с id пользователя и начать поиск по чатам (по полю members)

		if (!chat) {
			const user = await UserModel.findById(userId);
			if (!user) {
				throw ApiError.unAuthorizedError();
			}

			const chats = await ChatModel.find({ _id: { $in: user.chats } });
			return chats;
		}

		const candidateChatsArr = await UserModel.find({
			login: { $regex: chat, $options: "i" }
		});

		const getChats = candidateChatsArr.map(async (candidate) => {
			const chat = await ChatModel.findOne({
				members: { $all: [userId, candidate._id] }
			});
			return chat;
		});

		const chats = await Promise.all(getChats);
		return chats.filter((chat) => chat);
	}

	async saveMessageToDb(
		userId: string,
		recipientId: string,
		text: string
	): Promise<TMessage | null> {
		const date = getDateForMessage();

		const newMessage = new MessageModel({
			user: userId,
			text,
			date
		});

		await newMessage.save();

		const chat = await ChatModel.findOne({
			members: { $all: [userId, recipientId] }
		});

		if (!chat) {
			const newChat = new ChatModel({
				members: [userId, recipientId],
				messages: [newMessage._id]
			});

			await newChat.save();

			const user = await UserModel.findById(userId);
			const recipient = await UserModel.findById(recipientId);

			if (!user || !recipient) {
				return null; // сделать обработку ошибок с сокетами
			}

			user.chats.push(newChat._id.toString());
			recipient.chats.push(newChat._id.toString());

			await user.save();
			await recipient.save();

			return newMessage;
		}

		return null;
	}
}

export default new ChatsService();
