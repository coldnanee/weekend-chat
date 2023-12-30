import { useChatsStore } from "@/entities/chat";
import type { TMessage } from "@/entities/message";
import { useSocketStore } from "@/shared";

export const getMessageHandler = () => {
	useSocketStore.getState().socket.on("get-message", (message: TMessage) => {
		useChatsStore.getState().newMessage(message);
	});
};
