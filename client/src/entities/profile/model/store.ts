import type { AxiosError } from "axios";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { useAlertStore } from "@/features/alert";
import type { TAuthForm } from "@/entities/auth"; // eslint-disable-line boundaries/element-types
import type { TSettingsProfile } from "@/entities/settings"; // eslint-disable-line boundaries/element-types
import $axios from "@/shared";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { TProfile } from "../types";

type TProfileStore = {
	profile: TProfile | null;
	isLoading: boolean;
	removeProfileAvatar: () => void;
	fetchProfile: () => Promise<void>;
	logoutUser: () => void;
	updateProfile: (user: TSettingsProfile) => Promise<void>; // eslint-disable-line no-unused-vars
	loginUser: (user: TAuthForm, router: AppRouterInstance) => void; // eslint-disable-line no-unused-vars
	// prettier-ignore
	registrationUser: (user: TAuthForm, router: AppRouterInstance) => Promise<void>; // eslint-disable-line no-unused-vars
	toggleBlacklist: (userId: string) => void; // eslint-disable-line no-unused-vars
};

const handleProfileStoreError = (e: unknown) => {
	const err = e as AxiosError<{ message: string }>;

	const message = err.response?.data.message || "Unexpected error";
	useProfileStore.setState((state) => {
		state.isLoading = false;
	});
	if (err.response?.status !== 401) {
		useAlertStore.getState().setAlert({ type: "error", message });
	}
};

const preFetchFn = () =>
	useProfileStore.setState((state) => {
		state.isLoading = true;
	});

export const useProfileStore = create<TProfileStore>()(
	immer((set) => ({
		profile: null,
		isLoading: false,
		error: null,
		removeProfileAvatar: () =>
			set((state) => {
				if (state.profile) {
					state.profile.avatar = "";
				}
			}),
		fetchProfile: async () => {
			preFetchFn();
			try {
				const { data } = await $axios.post<TProfile>("/token/refresh");
				set({ profile: data });
			} catch (e) {
				handleProfileStoreError(e);
			} finally {
				set({ isLoading: false });
			}
		},
		logoutUser: async () => {
			preFetchFn();
			try {
				const { data } = await $axios.post<{ message: string }>(
					"/token/logout"
				);
				if (data) {
					location.replace("/login");
				}
			} catch (e) {
				handleProfileStoreError(e);
			}
		},
		updateProfile: async (user) => {
			preFetchFn();
			try {
				const { data } = await $axios.post<TProfile>("/profile/update", {
					...user
				});
				set({ profile: data });
			} catch (e) {
				handleProfileStoreError(e);
			} finally {
				set({ isLoading: false });
			}
		},
		loginUser: async (user) => {
			preFetchFn();
			try {
				const { status } = await $axios.post("/auth/login", {
					...user
				});

				if (status == 200 && window) {
					location.replace("/");
				}
			} catch (e) {
				localStorage.setItem("user", JSON.stringify(user));
				handleProfileStoreError(e);
			}
		},

		registrationUser: async (user, router) => {
			preFetchFn();
			try {
				const { status } = await $axios.post<{ message: string }>(
					"/auth/registration",
					{ ...user }
				);

				if (status == 200) {
					router.replace("/login");
				}
			} catch (e) {
				localStorage.setItem("user", JSON.stringify(user));
				handleProfileStoreError(e);
			} finally {
				set({ isLoading: false });
			}
		},
		toggleBlacklist: (userId) =>
			set((state) => {
				const blackList = state.profile?.blackList;
				if (blackList?.includes(userId) && state.profile) {
					state.profile.blackList = blackList.filter((u) => u !== userId);
				} else {
					blackList?.push(userId);
				}
			})
	}))
);
