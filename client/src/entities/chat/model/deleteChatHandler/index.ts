import type { Socket } from "socket.io-client";

import { useChatsStore } from "../store";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const deleteChatHandler = (
	router: AppRouterInstance,
	path: string,
	socket: Socket
) => {
	socket.on("delete-chat-client", ({ chatId }: { chatId: string }) => {
		useChatsStore.getState().deleteChat(router, path, chatId);
	});
};
