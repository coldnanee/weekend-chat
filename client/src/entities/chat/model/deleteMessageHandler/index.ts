import type { Socket } from "socket.io-client";

import { useChatsStore } from "../store";

export const deleteMessageHandler = (socket: Socket) => {
	socket.on("delete-message-client", ({ chatId, messagesId }) => {
		useChatsStore.getState().deleteMessage(chatId, messagesId);
	});
};
