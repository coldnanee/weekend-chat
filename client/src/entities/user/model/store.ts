import { create } from "zustand";

import { immer } from "zustand/middleware/immer";

type TOnlineUsersStore = {
	users: string[];
	offlineUser: string;
	setOfflineUser: (u: string) => void; // eslint-disable-line no-unused-vars
	updateOnlineUsers: (users: string[]) => void; // eslint-disable-line no-unused-vars
};

export const useOnlineUsersStore = create<TOnlineUsersStore>()(
	immer((set) => ({
		users: [],
		offlineUser: "",
		updateOnlineUsers: (updatedUsers) =>
			set((state) => {
				state.users = updatedUsers;
			}),
		setOfflineUser: (u) =>
			set((state) => {
				state.offlineUser = u;
			})
	}))
);
