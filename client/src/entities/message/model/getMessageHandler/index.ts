import { Socket } from "socket.io-client";

import type { TMessage } from "../types";
import type { TChat } from "@/entities/chat";
import type { QueryClient } from "@tanstack/react-query";

export const getMessageHandler = (socket: Socket, queryClient: QueryClient) => {
	socket.on("get-message", (data: TMessage) => {
		console.log(data);

		queryClient.setQueriesData(
			{
				queryKey: ["chats", { login: "" }]
			},
			(prevChats?: TChat[]) => {
				if (!prevChats) {
					return undefined;
				}
				return [...prevChats].map((chat) => {
					if (chat._id === data.chat) {
						return {
							...chat,
							messages: [...chat.messages, data]
						};
					}

					return chat;
				});
			}
		);

		queryClient.invalidateQueries({
			queryKey: ["chats", { login: "" }],
			refetchType: "none"
		});
	});
};
