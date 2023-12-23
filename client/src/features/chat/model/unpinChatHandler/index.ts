import type { Socket } from "socket.io-client";

import { useChatsStore } from "@/entities/chat";

export const unpinChatHandler = (socket: Socket) => {
	socket.on("unpin-chat-client", (chatId: string) => {
		useChatsStore.getState().unpinChat(chatId);
	});
};
