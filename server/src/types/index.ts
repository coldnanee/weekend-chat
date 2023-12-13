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
	chats: string[];
};

export type TProfilePayload = Omit<TUser, "password">;
export type TUserPayload = Omit<TUser, "password" | "chats">;

export type TMessage = {
	_id: string;
	user: Schema.Types.ObjectId;
	text: string;
	date: string;
	isRead: boolean;
	chat: Schema.Types.ObjectId;
};

export type TChat = {
	_id: string;
	members: string[];
	messages: string[];
	isPinned: boolean;
};

export type TChatPayload = Pick<TChat, "_id" | "isPinned"> & {
	user: TUser;
	message: TMessage[];
};

export type TBrowserInfo = {
	os: string;
	name: string;
	version: string;
	type: string;
} | null;
