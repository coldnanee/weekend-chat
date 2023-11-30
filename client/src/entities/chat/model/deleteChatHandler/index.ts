import type { Socket } from "socket.io-client";

import { chatsApi } from "../chatsApi";

export const deleteChatHandler = (socket: Socket, dispatch: any) => {
	socket.on("delete-chat-client", ({ chatId }: { chatId: string }) => {
		dispatch(
			chatsApi.util.updateQueryData("getChats", "", ({ chats }) => {
				const filteredChats = chats.filter((chat) => chat._id !== chatId);

				return { chats: { ...filteredChats } };
			})
		);
		location.href = "/";
	});
};
