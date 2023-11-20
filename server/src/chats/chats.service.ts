import { Types } from "mongoose";
// import ChatListModel from "../db/models/Chats";
import { ApiError } from "../errors";
import UserModel from "../db/models/UserModel";
import ChatModel from "../db/models/ChatModel";

class ChatsService {
	async getChats(chat: string, user: string) {
		// const chats = await ChatListModel.findOne({ user });

		// if (!chats) {
		// 	throw ApiError.unAuthorizedError();
		// }

		// const chatIds = chats.chatIds.map((chat) => new Types.ObjectId(chat));

		// const userChats = ChatModel.find({ _id: { $in: chatIds } });

		// console.log(userChats);

		if (chat) {
		}
	}
}

export default new ChatsService();
