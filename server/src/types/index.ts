import { Schema } from "mongoose";

declare global {
	namespace Express {
		interface Request {
			userId: string;
		}
	}
}
export type TUser = {
	_id: string;
	login: string;
	password: string;
	avatar: string;
	chatList: string[];
};

export type TProfilePayload = Omit<TUser, "password">;
export type TUserPayload = Omit<TUser, "password" | "chatList">;

export type TMessage = {
	_id: string;
	chat: Schema.Types.ObjectId;
	user: Schema.Types.ObjectId;
	text: string;
	date: string;
};

export type TChat = {
	_id: string;
	membersList: string[];
	messageListIds: string[];
};

export type TChatList = {
	_id: string;
	user: Schema.Types.ObjectId;
	chatIds: string[];
	pinnedChatIds: string[];
};
