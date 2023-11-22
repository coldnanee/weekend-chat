import type { TUser } from "@/entities/user";

import type { TMessage } from "@/entities/message";

export type TChat = {
	_id: string;
	user: TUser;
	messages: TMessage[];
	isPinned: boolean;
};
