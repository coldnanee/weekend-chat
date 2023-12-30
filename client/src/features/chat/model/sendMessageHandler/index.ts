import { useChatsStore } from "@/entities/chat";
import type { TMessage } from "@/entities/message";

import { useSocketStore } from "@/shared";

export const sendMessageHandler = () => {
	useSocketStore
		.getState()
		.socket.on("send-message-client", (message: TMessage) => {
			useChatsStore.getState().sendMessage(message);
		});
};
