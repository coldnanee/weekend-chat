import { Socket } from "socket.io-client";

import { useChatsStore } from "../store";

import type { TMessage } from "@/entities/message";

export const sendMessageHandler = (socket: Socket) => {
	socket.on("send-message", (message: TMessage) => {
		useChatsStore.getState().sendMessage(message);
	});
};
