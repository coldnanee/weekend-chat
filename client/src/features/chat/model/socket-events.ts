import { useChatsStore, type TChat } from "@/entities/chat";
import type { TMessage } from "@/entities/message";
import { useSocketStore } from "@/shared";

export class ChatSocketEvents {
	static deleteChatHandler() {
		useSocketStore
			.getState()
			.socket.on("delete-chat-client", ({ chatId }: { chatId: string }) => {
				useChatsStore.getState().deleteChat(chatId);
			});
	}
	static deleteMessageHandler() {
		useSocketStore
			.getState()
			.socket.on("delete-message-client", ({ chatId, messagesId }) => {
				useChatsStore.getState().deleteMessage(chatId, messagesId);
			});
	}
	static editMessageHandler() {
		useSocketStore
			.getState()
			.socket.on(
				"edit-message-client",
				(data: { messageId: string; updateText: string; chat: string }) => {
					useChatsStore.getState().editMessage(data);
				}
			);
	}
	static getMessageHandler() {
		useSocketStore.getState().socket.on("get-message", (message: TMessage) => {
			useChatsStore.getState().newMessage(message);
		});
	}
	static newChatHandler() {
		useSocketStore.getState().socket.on("new-chat", (chat: TChat) => {
			useChatsStore.getState().newChat(chat);
		});
	}
	static pinChatHandler() {
		useSocketStore.getState().socket.on("pin-chat-client", (chatId: string) => {
			useChatsStore.getState().pinChat(chatId);
		});
	}
	static sendMessageHandler() {
		useSocketStore
			.getState()
			.socket.on("send-message-client", (message: TMessage) => {
				useChatsStore.getState().sendMessage(message);
			});
	}
	static unpinChatHandler() {
		useSocketStore
			.getState()
			.socket.on("unpin-chat-client", (chatId: string) => {
				useChatsStore.getState().unpinChat(chatId);
			});
	}
}
