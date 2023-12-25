import { getCookie } from "cookies-next";
import { type Socket, io } from "socket.io-client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { refreshToken } from "../lib";
import type { TSocketEvent } from "./types";

type TSocketStore = {
	socket: Socket;
	isRefreshLoading: boolean;
	setIsRefreshLoading: (r: boolean) => void; // eslint-disable-line no-unused-vars
	stackEvents: TSocketEvent[];
	addEventToStack: (e: TSocketEvent) => void; // eslint-disable-line no-unused-vars
	clearEventsStack: () => void; // eslint-disable-line no-unused-vars
	// prettier-ignore
	socketEvent: (name: string, data: unknown) => void; //eslint-disable-line no-unused-vars
	runEventsFromStack: () => void;
};

export const useSocketStore = create<TSocketStore>()(
	immer((set, get) => ({
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
		socket: io(process.env.NEXT_PUBLIC_SERVER_URL || "", {
			path: "/ws",
			transports: ["websocket"],
			autoConnect: false
		}),
		runEventsFromStack: () => {
			const { stackEvents, socketEvent, clearEventsStack } = get();
			stackEvents.map(({ name, data }) => socketEvent(name, data));
			clearEventsStack();
		},
		socketEvent: (name, data) => {
			const {
				socket,
				isRefreshLoading,
				addEventToStack,
				runEventsFromStack,
				setIsRefreshLoading
			} = get();
			socket.emit(
				name,
				data,
				getCookie("accessJwt"),
				(err: { status: number }) => {
					if (err.status === 401) {
						addEventToStack({ name, data });
						if (!isRefreshLoading) {
							setIsRefreshLoading(true);
							refreshToken()
								.then((refresh) =>
									refresh
										? runEventsFromStack()
										: window && window.location.replace("/")
								)
								.finally(() => setIsRefreshLoading(false));
						}
					}
				}
			);
		}
	}))
);
