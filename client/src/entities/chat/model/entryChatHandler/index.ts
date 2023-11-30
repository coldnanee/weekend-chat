import type { Socket } from "socket.io-client";

import { chatsApi } from "../chatsApi";

import { current } from "@reduxjs/toolkit";

export const entryChatHandler = (socket: Socket, dispatch: any) => {
	socket.on(
		"entry-chat-client",
		({ chatId, userId }: { chatId: string; userId: string }) => {
			dispatch(
				chatsApi.util.updateQueryData("getChats", "", ({ chats }) => {
					const updatedChats = chats.map((chat) => {
						if (chat._id === chatId) {
							const readMessages = chat.messages.map((message) => {
								if (message.user !== userId && !message.isRead) {
									return { ...message, isRead: true };
								}
								return message;
							});

							return { ...chat, messages: readMessages };
						}

						return chat;
					});

					return { chats: updatedChats };
				})
			);
		}
	);
};
