import { useOnlineUsersStore } from "@/entities/user";
import { useSocketStore } from "@/shared";

export class UserSocketEvents {
	static newOfflineUserHandler() {
		useSocketStore
			.getState()
			.socket.on("new-offline-user", (users: string[]) => {
				const offlineUser = useOnlineUsersStore
					.getState()
					.users.find((u) => !users.includes(u));
				if (offlineUser) {
					useOnlineUsersStore.getState().setOfflineUser(offlineUser);
				}
				useOnlineUsersStore.getState().updateOnlineUsers(users);
			});
	}

	static newOnlineUserHandler() {
		useSocketStore
			.getState()
			.socket.on("new-online-user", (users: string[]) => {
				useOnlineUsersStore.getState().updateOnlineUsers(users);
			});
	}
}
