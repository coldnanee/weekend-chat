import { Socket } from "socket.io-client";
import { useChatsStore } from "@/entities/chat";
import type { TMessage } from "@/entities/message";

export const sendMessageHandler = (socket: Socket) => {
	socket.on("send-message-client", (message: TMessage) => {
		useChatsStore.getState().sendMessage(message);
	});
};