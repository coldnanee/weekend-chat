import type { Socket } from "socket.io-client";

import { useChatsStore } from "@/entities/chat";

export const deleteChatHandler = (socket: Socket) => {
	socket.on("delete-chat-client", ({ chatId }: { chatId: string }) => {
		useChatsStore.getState().deleteChat(chatId);
	});
};
