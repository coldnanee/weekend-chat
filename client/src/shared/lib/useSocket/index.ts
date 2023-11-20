import { io, type Socket } from "socket.io-client";

import { useAppSelector } from "@/app/store/hooks/useAppSelector";

export const useSocket = (): { socket: Socket } => {
	const user = useAppSelector((state) => state.profile.profile?._id);

	const socket = io("http://localhost:4000", {
		transports: ["websocket"],
		autoConnect: false,
		query: {
			user
		}
	});

	return { socket };
};
