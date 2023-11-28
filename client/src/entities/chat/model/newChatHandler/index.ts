import type { Socket } from "socket.io-client";

import { chatsApi } from "../chatsApi";

import type { TChat } from "../types";

export const newChatHandler = (socket: Socket, dispatch: any) => {
	socket.on("new-chat", (chat: TChat) => {
		console.log(chat);

		dispatch(
			chatsApi.util.updateQueryData("getChats", "", ({ chats }) => {
				chats.push(chat);
			})
		);
	});
};
