import type { Socket } from "socket.io-client";

import { useChatsStore } from "@/entities/chat";

export const entryChatHandler = (socket: Socket) => {
	socket.on(
		"entry-chat-client",
		({ chatId, userId }: { chatId: string; userId: string }) => {
			const { entryChat } = useChatsStore.getState();
			entryChat(chatId, userId);
		}
	);
};
