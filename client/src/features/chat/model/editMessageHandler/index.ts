import { useChatsStore } from "@/entities/chat";
import { useSocketStore } from "@/shared";

export const editMessageHandler = () => {
	useSocketStore
		.getState()
		.socket.on(
			"edit-message-client",
			(data: { messageId: string; updateText: string; chat: string }) => {
				useChatsStore.getState().editMessage(data);
			}
		);
};
