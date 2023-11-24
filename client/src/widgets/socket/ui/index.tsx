"use client";

import { useQueryClient } from "@tanstack/react-query";

import { createContext, useContext } from "react";

import { useEffect } from "react";

import { io, Socket } from "socket.io-client";

import type { ReactNode } from "react";

import { getMessageHandler } from "@/entities/message";

export const SocketContext = createContext<{ socket?: Socket }>({
	socket: undefined
});

export const useSocketContext = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
	const queryClient = useQueryClient();

	const socket = io("http://localhost:4000", {
		transports: ["websocket"],
		autoConnect: false
	});

	useEffect(() => {
		socket.connect();
	});

	// connect handlers

	getMessageHandler(socket, queryClient);

	return (
		<SocketContext.Provider value={{ socket: socket }}>
			{children}
		</SocketContext.Provider>
	);
};
