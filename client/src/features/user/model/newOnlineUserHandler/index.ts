import { useOnlineUsersStore } from "@/entities/user";

import { useSocketStore } from "@/shared";

export const newOnlineUserHandler = () => {
	useSocketStore.getState().socket.on("new-online-user", (users: string[]) => {
		useOnlineUsersStore.getState().updateOnlineUsers(users);
	});
};
