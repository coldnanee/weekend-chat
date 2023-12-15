import { create } from "zustand";

import $axios from "@/shared";

import { immer } from "zustand/middleware/immer";

import { IProfile } from "./types";
import type { AxiosError } from "axios";

import type { TSettingsProfile } from "@/widgets/settings";
import type { TAuthForm } from "@/features/auth";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type TProfileStore = {
	profile: IProfile | null;
	isLoading: boolean;
	error: null | string;
	removeProfileAvatar: () => void;
	fetchProfile: () => Promise<void>;
	logoutUser: () => void;
	updateProfile: (user: TSettingsProfile) => Promise<void>;
	loginUser: (user: TAuthForm, router: AppRouterInstance) => void;
	registrationUser: (
		user: TAuthForm,
		router: AppRouterInstance
	) => Promise<void>;
};

const handleProfileStoreError = (e: unknown) => {
	const err = e as AxiosError<{ message: string }>;

	const message = err.response?.data.message || "Unexpected error";
	useProfileStore.setState((state) => {
		state.error = message;
		state.isLoading = false;
	});
	if (err.response?.status !== 401) {
		alert(message);
	}
};

const preFetchFn = () =>
	useProfileStore.setState((state) => {
		state.error = null;
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
				const { data } = await $axios.post<IProfile>("/token/refresh");
				set({ profile: data });
			} catch (e) {
				alert(e);
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
					location.href = "/login";
				}
			} catch (e) {
				handleProfileStoreError(e);
			}
		},
		updateProfile: async (user) => {
			preFetchFn();
			try {
				const { data } = await $axios.post<IProfile>("/profile/update", {
					...user
				});
				set({ profile: data });
			} catch (e) {
				handleProfileStoreError(e);
			} finally {
				set({ isLoading: false });
			}
		},
		loginUser: async (user, router) => {
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
		}
	}))
);
