import { useOnlineUsersStore } from "@/entities/user";

import { useSocketStore } from "@/shared";

export const newOfflineUserHandler = () => {
	useSocketStore.getState().socket.on("new-offline-user", (users: string[]) => {
		const offlineUser = useOnlineUsersStore
			.getState()
			.users.find((u) => !users.includes(u));
		if (offlineUser) {
			useOnlineUsersStore.getState().setOfflineUser(offlineUser);
		}
		useOnlineUsersStore.getState().updateOnlineUsers(users);
	});
};
