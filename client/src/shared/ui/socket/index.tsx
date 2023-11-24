"use client";

import { useQueryClient } from "@tanstack/react-query";

import { socket } from "@/shared/lib/socket";

import { useEffect } from "react";

import type { ReactNode } from "react";

import type { TMessage } from "@/entities/message";

import type { TChat } from "@/entities/chat";

export const SocketProvider = ({ children }: { children: ReactNode }) => {
	const queryClient = useQueryClient();

	useEffect(() => {
		socket.connect();
	});

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

	return <>{children}</>;
};
