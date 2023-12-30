import { useChatsStore } from "@/entities/chat";
import { useSocketStore } from "@/shared";

export const pinChatHandler = () => {
	useSocketStore.getState().socket.on("pin-chat-client", (chatId: string) => {
		useChatsStore.getState().pinChat(chatId);
	});
};
