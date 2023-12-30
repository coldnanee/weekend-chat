import { useChatsStore } from "@/entities/chat";
import { useSocketStore } from "@/shared";

export const unpinChatHandler = () => {
	useSocketStore.getState().socket.on("unpin-chat-client", (chatId: string) => {
		useChatsStore.getState().unpinChat(chatId);
	});
};
