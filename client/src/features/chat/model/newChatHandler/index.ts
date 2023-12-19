import type { Socket } from "socket.io-client";

import { useChatsStore } from "@/entities/chat";

import type { TChat } from "@/entities/chat";

export const newChatHandler = (socket: Socket) => {
	socket.on("new-chat", (chat: TChat) => {
		useChatsStore.getState().newChat(chat);
	});
};
