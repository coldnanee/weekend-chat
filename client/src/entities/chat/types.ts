import type { TMessage } from "@/entities/message"; // eslint-disable-line boundaries/element-types

import type { TUser } from "@/entities/user"; // eslint-disable-line boundaries/element-types

export type TChat = {
	_id: string;
	user: TUser;
	messages: TMessage[];
	isPinned: boolean;
};
