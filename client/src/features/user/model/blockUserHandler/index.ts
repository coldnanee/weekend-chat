import type { Socket } from "socket.io-client";

import { useProfileStore } from "@/entities/profile";

export const blockUserHandler = (socket: Socket) => {
	socket.on("block-user-client", (data: { userId: string }) => {
		useProfileStore.getState().toggleBlacklist(data.userId);
	});
};
