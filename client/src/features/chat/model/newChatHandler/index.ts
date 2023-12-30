import { useChatsStore } from "@/entities/chat";

import type { TChat } from "@/entities/chat";
import { useSocketStore } from "@/shared";

export const newChatHandler = () => {
	useSocketStore.getState().socket.on("new-chat", (chat: TChat) => {
		useChatsStore.getState().newChat(chat);
	});
};
