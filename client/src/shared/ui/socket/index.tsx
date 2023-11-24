"use client";

import { useQueryClient } from "@tanstack/react-query";

import { createContext, useContext } from "react";

import { useEffect } from "react";

import { useAppSelector } from "@/app/store/hooks/useAppSelector";

import { io, Socket } from "socket.io-client";

import type { ReactNode } from "react";

import type { TMessage } from "@/entities/message";

import type { TChat } from "@/entities/chat";

export const SocketContext = createContext<{ socket?: Socket }>({
	socket: undefined
});

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
	const { profile } = useAppSelector((state) => state.profile);

	const queryClient = useQueryClient();

	const socket = io("http://localhost:4000", {
		transports: ["websocket"],
		autoConnect: false,
		query: {
			user: profile?._id
		}
	});

	useEffect(() => {
		if (profile) {
			socket.connect();
		}
	}, [profile]);

	// socket.current?.on("new-online-user", (data) => {
	// 	// console.log(data);
	// });

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

	return (
		<SocketContext.Provider value={{ socket: socket }}>
			{children}
		</SocketContext.Provider>
	);
};
