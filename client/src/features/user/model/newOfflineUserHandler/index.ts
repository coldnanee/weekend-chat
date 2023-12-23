import { Socket } from "socket.io-client";

import { useOnlineUsersStore } from "@/entities/user";

export const newOfflineUserHandler = (socket: Socket) => {
	socket.on("new-offline-user", (users: string[]) => {
		const offlineUser = useOnlineUsersStore
			.getState()
			.users.find((u) => !users.includes(u));
		if (offlineUser) {
			useOnlineUsersStore.getState().setOfflineUser(offlineUser);
		}
		useOnlineUsersStore.getState().updateOnlineUsers(users);
	});
};
