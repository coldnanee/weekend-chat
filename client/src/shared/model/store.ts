import { getCookie } from "cookies-next";
import { type Socket, io } from "socket.io-client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { TSocketEvent } from "./types";

type TSocketStore = {
	socket: Socket;
	error: string | null;
	isRefreshLoading: boolean;
	setIsRefreshLoading: (r: boolean) => void; // eslint-disable-line no-unused-vars
	stackEvents: TSocketEvent[];
	addEventToStack: (e: TSocketEvent) => void; // eslint-disable-line no-unused-vars
	clearEventsStack: () => void; // eslint-disable-line no-unused-vars
	setError: (e: string | null) => void; // eslint-disable-line no-unused-vars,
	socketEvent: (name: string, data: unknown) => void; //eslint-disable-line no-unused-vars
	runEvents: () => void;
};

export const useSocketStore = create<TSocketStore>()(
	immer((set, get) => ({
		error: null,
		isRefreshLoading: false,
		setIsRefreshLoading: (s) =>
			set((state) => {
				state.isRefreshLoading = s;
			}),
		stackEvents: [],
		addEventToStack: (e) =>
			set((state) => {
				state.stackEvents.push(e);
			}),
		clearEventsStack: () =>
			set((state) => {
				state.stackEvents.length = 0;
			}),
		setError: (e) =>
			set((state) => {
				state.error = e;
			}),
		socket: io(process.env.NEXT_PUBLIC_SERVER_URL || "", {
			path: "/ws",
			transports: ["websocket"],
			autoConnect: false
		}),
		socketEvent: (name, data) => {
			get().socket.emit(name, data, getCookie("accessJwt"));
		},
		runEvents: () => {
			const { stackEvents, socketEvent, clearEventsStack } = get();
			stackEvents.map(({ name, data }) => socketEvent(name, data));
			clearEventsStack();
		}
	}))
);
