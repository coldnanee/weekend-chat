import { create } from "zustand";

import { immer } from "zustand/middleware/immer";

type TOnlineUsersStore = {
	users: string[];
	updateOnlineUsers: (users: string[]) => void; // eslint-disable-line no-unused-vars
};

export const useOnlineUsersStore = create<TOnlineUsersStore>()(
	immer((set) => ({
		users: [],
		updateOnlineUsers: (updatedUsers) =>
			set((state) => {
				state.users = updatedUsers;
			})
	}))
);
