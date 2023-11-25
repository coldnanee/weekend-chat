import { Socket } from "socket.io-client";

import { chatsApi } from "../chatsApi";

import type { TMessage } from "@/entities/message";

export const sendMessageHandler = (socket: Socket, dispatch: any) => {
	socket.on("send-message", (message: TMessage) => {
		dispatch(
			chatsApi.util.updateQueryData("getChats", "", ({ chats }) => {
				const chat = chats.find((chat) => chat._id === message.chat);
				chat?.messages.push(message);
			})
		);
	});
};
