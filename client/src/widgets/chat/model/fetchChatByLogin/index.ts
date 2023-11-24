import $axios from "@/shared";

import type { TChat } from "@/entities/chat";

export const fetchChatByLogin = async (login: string) => {
	const { data } = await $axios.get<{ chat: TChat } | { recipientId: string }>(
		`chats/${login}`
	);

	if ("chat" in data) {
		return { recipientId: data.chat?.user._id, chat: data.chat };
	}

	return { recipientId: data.recipientId, chat: null };
};
