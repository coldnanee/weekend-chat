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
	alert(message);
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
		fetchProfile: async () =>
			set((state) => {
				preFetchFn();
				$axios
					.post<IProfile>("/token/refresh")
					.then(({ data }) =>
						useProfileStore.setState((state) => {
							state.profile = data;
						})
					)
					.catch((e) => handleProfileStoreError(e))
					.finally(() =>
						useProfileStore.setState((state) => {
							state.isLoading = false;
						})
					);
			}),
		logoutUser: () =>
			set(async (state) => {
				try {
					preFetchFn();
					const { data } = await $axios.post<{ message: string }>(
						"/token/logout"
					);
					if (data) {
						state.profile = null;
						location.href = "/login";
						state.isLoading = false;
					}
				} catch (e) {
					handleProfileStoreError(e);
				}
			}),
		updateProfile: async (user) =>
			set((state) => {
				preFetchFn();
				$axios
					.post<IProfile>("/profile/update", {
						...user
					})
					.then(({ data }) =>
						useProfileStore.setState((state) => {
							state.profile = data;
						})
					)
					.catch((e) => handleProfileStoreError(e))
					.finally(() =>
						useProfileStore.setState((state) => {
							state.isLoading = false;
						})
					);
			}),
		loginUser: (user, router) =>
			set(async (state) => {
				try {
					preFetchFn();

					const { status } = await $axios.post("/auth/login", {
						...user
					});

					if (status == 200) {
						state.isLoading = false;
						if (window) location.href = "/";
					}
				} catch (e) {
					localStorage.setItem("user", JSON.stringify(user));
					handleProfileStoreError(e);
				}
			}),
		registrationUser: async (user, router) =>
			set((state) => {
				preFetchFn();

				$axios
					.post<{ message: string }>("/auth/registration", { ...user })
					.then(() => {
						router.replace("/login");
					})
					.catch((e) => {
						localStorage.setItem("user", JSON.stringify(user));
						handleProfileStoreError(e);
					})
					.finally(() =>
						useProfileStore.setState((state) => {
							state.isLoading = false;
						})
					);
			})
	}))
);
