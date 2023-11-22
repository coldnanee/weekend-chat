import { getDateForMessage } from "../libs";

import MessageModel from "../db/models/MessageModel";
import ChatModel from "../db/models/ChatModel";
import UserModel from "../db/models/UserModel";
import { TChat, TMessage } from "../types";
import { ApiError } from "../errors";
import { UserDto } from "../dtos/user.dto";

class ChatsService {
	async getAllChats(userId: string) {
		const user = await UserModel.findById(userId);
		if (!user) {
			throw ApiError.unAuthorizedError();
		}

		const chats = await ChatModel.find({ _id: { $in: user.chats } });

		const formattingChats = chats.slice(0, 5).map(async (chat) => {
			const { isPinned, _id } = chat;

			const messages = await MessageModel.find({
				_id: { $in: chat.messages }
			});
			const memberId = chat.members
				.filter((member) => member !== userId)
				.join("");
			const user = await UserModel.findById(memberId);

			if (!user) {
				throw ApiError.badRequestError(`Chat profile not found`);
			}

			const userDto = new UserDto(user);

			return { messages, user: userDto, _id, isPinned };
		});

		const formattedChats = await Promise.all(formattingChats);

		return formattedChats;
	}
	async getChatsByLogin(chat: string, userId: string) {
		const candidateChatsArr = await UserModel.find({
			login: { $regex: chat, $options: "i" }
		});

		const getChats = candidateChatsArr.map(async (candidate) => {
			const chat = await ChatModel.findOne({
				members: { $all: [userId, candidate._id] }
			});

			if (!chat) {
				return null;
			}

			const { isPinned, _id } = chat;

			const recipientId = chat?.members
				.filter((member) => member !== userId)
				.join("");

			const user = await UserModel.findById(recipientId);

			if (!user) {
				throw ApiError.badRequestError(`Chat profile not found`);
			}

			const userDto = new UserDto(user);

			const lastMessageId = chat.messages[chat.messages.length - 1];

			const lastMessage = await MessageModel.findById(lastMessageId);

			if (!lastMessage) {
				throw ApiError.badRequestError("Dialog not found");
			}

			return { messages: [lastMessage], user: userDto, _id, isPinned };
		});

		const chats = await Promise.all(getChats);
		return chats.filter((chat) => chat).slice(0, 5);
	}
	async getChats(chat: string, userId: string) {
		// chat - буква логина человека

		// 1. найти всех людей у которых в логине содержится chat [x]
		// 2. по очереди подставить id в массив вместе с id пользователя и начать поиск по чатам (по полю members)

		if (!chat) {
			return this.getAllChats(userId);
		}
		return this.getChatsByLogin(chat, userId);
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
