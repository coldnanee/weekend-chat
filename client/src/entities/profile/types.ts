import type { TUser } from "@/entities/user"; // eslint-disable-line boundaries/element-types

export type TProfile = Omit<TUser, "isBlock"> & {
	chats: string[];
	email: string;
	blackList: string[];
};
