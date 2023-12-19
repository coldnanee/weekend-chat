import { getDateForMessage } from "../libs";

import MessageModel from "../db/models/MessageModel";
import ChatModel from "../db/models/ChatModel";
import UserModel from "../db/models/UserModel";
import { ApiError } from "../errors";
import { UserDto } from "../dtos/user.dto";
import { Types } from "mongoose";

class ChatsService {
	async getAllChats(userId: string) {
		const user = await UserModel.findById(userId);

		if (!user) {
			throw ApiError.unAuthorizedError();
		}

		const chats = await ChatModel.find({ _id: { $in: user.chats } });

		const formattingChats = chats.map(async (chat) => {
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
		return chats.filter((chat) => chat);
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
		text: string,
		isRead: boolean
	) {
		const date = getDateForMessage();

		const chat = await ChatModel.findOne({
			members: { $all: [userId, recipientId] }
		});

		if (!chat) {
			const newChat = new ChatModel({
				members: [userId, recipientId]
			});

			const newMessage = new MessageModel({
				user: new Types.ObjectId(userId),
				text,
				date,
				chat: newChat._id,
				isRead
			});

			await newMessage.save();

			newChat.messages = [newMessage._id];

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

			const getMessages = newChat.messages.map(async (id) => {
				const message = await MessageModel.findById(id);
				return message || null;
			});

			const messages = await Promise.all(getMessages);

			const userChatDto = {
				messages,
				isPinned: false,
				_id: newChat._id,
				user: new UserDto(user)
			};

			const recipientChatDto = {
				messages,
				isPinned: false,
				_id: newChat._id,
				user: new UserDto(recipient)
			};

			return { newMessage, userChatDto, recipientChatDto };
		}

		const newMessage = new MessageModel({
			user: new Types.ObjectId(userId),
			text,
			date,
			chat: chat._id,
			isRead
		});

		await newMessage.save();

		chat.messages.push(newMessage._id);

		await chat.save();

		return { newMessage, newChat: null };
	}

	async getChatByLogin(userId: string, login: string) {
		const user = await UserModel.findOne({ login });

		if (!user) {
			throw ApiError.badRequestError("User not found!");
		}

		const chat = await ChatModel.findOne({
			members: { $all: [userId, user._id] }
		});

		if (!chat) {
			return { recipientId: user._id };
		}

		const { isPinned, _id } = chat;

		const getMessages = chat.messages.map(async (msg) => {
			const message = await MessageModel.findById(msg);
			return message;
		});

		const messages = await Promise.all(getMessages);

		const fullChat = { isPinned, _id, user, messages };

		return fullChat;
	}

	async getUserInfo(login: string) {
		const user = await UserModel.findOne({ login });

		if (!user) {
			throw ApiError.badRequestError("User not found");
		}

		const userDto = new UserDto(user);

		return userDto;
	}

	async deleteChat(chatId: string) {
		const chat = await ChatModel.findById(chatId);
		if (!chat) {
			return;
		}

		const deleteUsersChat = chat.members.map(async (u) => {
			const user = await UserModel.findById(u);
			if (!user) {
				return;
			}
			const updatedChats = user.chats.filter((chat) => chat !== chatId);

			user.chats = updatedChats;

			await user.save();
		});

		await MessageModel.deleteMany({ _id: { $in: chat.messages } });
		await ChatModel.deleteOne({ _id: chatId });
		await Promise.all(deleteUsersChat);
	}
}

export default new ChatsService();
