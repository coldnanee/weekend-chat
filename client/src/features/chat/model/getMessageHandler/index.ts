import { Socket } from "socket.io-client";

import { useChatsStore } from "@/entities/chat";
import type { TMessage } from "@/entities/message";

export const getMessageHandler = (socket: Socket) => {
	socket.on("get-message", (message: TMessage) => {
		useChatsStore.getState().newMessage(message);
	});
};