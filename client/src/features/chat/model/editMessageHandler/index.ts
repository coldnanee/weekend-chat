import type { Socket } from "socket.io-client";

import { useChatsStore } from "@/entities/chat";

export const editMessageHandler = (socket: Socket) => {
	socket.on(
		"edit-message-client",
		(data: { messageId: string; updateText: string; chat: string }) => {
			useChatsStore.getState().editMessage(data);
		}
	);
};
