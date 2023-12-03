import type { Socket } from "socket.io-client";

import { useChatsStore } from "../store";

import type { TChat } from "../types";

export const newChatHandler = (socket: Socket) => {
	socket.on("new-chat", (chat: TChat) => {
		useChatsStore.getState().newChat(chat);
	});
};
