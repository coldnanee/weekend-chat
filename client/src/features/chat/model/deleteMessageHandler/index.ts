import { useChatsStore } from "@/entities/chat";
import { useSocketStore } from "@/shared";

export const deleteMessageHandler = () => {
	useSocketStore
		.getState()
		.socket.on("delete-message-client", ({ chatId, messagesId }) => {
			useChatsStore.getState().deleteMessage(chatId, messagesId);
		});
};
