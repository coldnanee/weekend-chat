import $axios from "@/shared";

import type { TChat } from "@/entities/chat";

export const fetchChatsByLogin = async (chat: string) => {
	if (chat) {
		try {
			const { data } = await $axios.get<{ chats: TChat[] }>("chats", {
				params: { chat }
			});
			return data.chats;
		} catch (e) {
			alert(e);
		}
	}
	return null;
};
