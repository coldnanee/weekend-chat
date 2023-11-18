import type { TUser } from "@/entities/user";

export interface IProfile extends TUser {
	chatList: string[];
}
