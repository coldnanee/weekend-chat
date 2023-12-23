import type { Socket } from "socket.io-client";

import { useChatsStore } from "@/entities/chat";

export const pinChatHandler = (socket: Socket) => {
	socket.on("pin-chat-client", (chatId: string) => {
		useChatsStore.getState().pinChat(chatId);
	});
};
