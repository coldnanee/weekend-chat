import type { TMessage } from "@/entities/message";

import { useMemo } from "react";

export const useCountUnreadMessages = (
	userId: string,
	messages: TMessage[]
): { unreadMessagesCounter: number } =>
	useMemo(() => {
		const unreadMessages = messages.filter(
			(msg) => !msg.isRead && msg.user !== userId
		);

		return { unreadMessagesCounter: unreadMessages.length };
	}, [messages]);
