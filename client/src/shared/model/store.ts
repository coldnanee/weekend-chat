import { type Socket, io } from "socket.io-client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type TSocketStore = {
	socket: Socket;
	error: string | null;
	setError: (e: string | null) => void; //eslint-disable-line no-unused-vars
};

export const useSocketStore = create<TSocketStore>()(
	immer((set) => ({
		error: null,
		setError: (e) =>
			set((state) => {
				state.error = e;
			}),
		socket: io(process.env.NEXT_PUBLIC_SERVER_URL || "", {
			path: "/ws",
			transports: ["websocket"],
			autoConnect: false
		})
	}))
);
