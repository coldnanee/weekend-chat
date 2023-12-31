import type { AxiosError } from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { useProfileStore } from "@/entities/profile";

import type { TUser } from "@/entities/user";
import { useAlertStore } from "@/shared";
import $axios from "@/shared";

type TBlackListStore = {
	users: TUser[];
	fetchBlackList: () => void;
	isBlacklistLoading: boolean;
	blockUser: (u: TUser) => void; // eslint-disable-line no-unused-vars
	unblockUser: (u: string) => void; // eslint-disable-line no-unused-vars
};

export const useBlacklistStore = create<TBlackListStore>()(
	immer((set, get) => ({
		users: [],
		isBlacklistLoading: false,
		fetchBlackList: async () => {
			useBlacklistStore.setState({ isBlacklistLoading: true });
			try {
				const { data } = await $axios.get<TUser[]>("/profile/blacklist");
				set({ users: data });
			} catch (e) {
				const err = e as AxiosError<{ message: string }>;
				useAlertStore.getState().setAlert({
					message: err.response?.data.message || "",
					type: "error"
				});
			} finally {
				set({ isBlacklistLoading: false });
			}
		},
		unblockUser: async (user) => {
			useBlacklistStore.setState({ isBlacklistLoading: true });
			try {
				const { status } = await $axios.post("/profile/unblock", {
					user
				});

				if (status == 200) {
					useProfileStore.getState().toggleBlacklist(user);
					const filteredUsers = get().users.filter((u) => u._id !== user);
					set({ users: filteredUsers });
				}
			} catch (e) {
				const err = e as AxiosError<{ message: string }>;
				useAlertStore.getState().setAlert({
					type: "error",
					message: err.response?.data.message || ""
				});
			} finally {
				set({ isBlacklistLoading: false });
			}
		},
		blockUser: async (u) => {
			useBlacklistStore.setState({ isBlacklistLoading: true });
			try {
				const { status } = await $axios.post("/profile/block", {
					user: u
				});

				if (status == 200) {
					useProfileStore.getState().toggleBlacklist(u._id);
					const updatedUsers = [...get().users, u];
					set({ users: updatedUsers });
				}
			} catch (e) {
				const err = e as AxiosError<{ message: string }>;
				useAlertStore.getState().setAlert({
					type: "error",
					message: err.response?.data.message || ""
				});
			} finally {
				set({ isBlacklistLoading: false });
			}
		}
	}))
);
