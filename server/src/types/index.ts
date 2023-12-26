import { Schema } from "mongoose";

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
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
	lastOnline: string;
	email: string;
	blackList: string[];
};

export type TProfilePayload = Omit<TUser, "password">;
export type TUserPayload = Omit<TUser, "password" | "chats">;
export type TTokenPayload = Omit<
	TUser,
	"password" | "chats" | "lastOnline" | "avatar" | "email" | "blackList"
>;

export type TMessage = {
	_id: string;
	user: Schema.Types.ObjectId;
	text: string;
	date: string;
	chat: Schema.Types.ObjectId;
	isUpdated: boolean;
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

export type TSession = {
	_id: string;
	user: Schema.Types.ObjectId;
	refreshToken: string;
	browser: string;
	os: string;
};

export type TEmail = {
	_id: string;
	email: string;
	link: string;
};
