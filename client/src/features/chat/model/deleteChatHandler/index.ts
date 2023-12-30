import { useChatsStore } from "@/entities/chat";
import { useSocketStore } from "@/shared";

export const deleteChatHandler = () => {
	useSocketStore
		.getState()
		.socket.on("delete-chat-client", ({ chatId }: { chatId: string }) => {
			useChatsStore.getState().deleteChat(chatId);
		});
};
