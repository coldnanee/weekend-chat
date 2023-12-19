import type { TUser } from "@/entities/user"; // eslint-disable-line boundaries/element-types

export interface IProfile extends TUser {
	chats: string[];
}
