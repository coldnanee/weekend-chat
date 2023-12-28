import { AxiosError } from "axios";
import { create } from "zustand";

import { immer } from "zustand/middleware/immer";

import $axios from "@/shared";

import type { TProfileSettings } from "../types";

type TProfileSettingsStore = {
	settings: TProfileSettings | null;
	fetchSettings: () => void;
	settingsError: null | string;
	isSettingsLoading: boolean;
};

export const useProfileSettingsStore = create<TProfileSettingsStore>()(
	immer((set) => ({
		settings: null,
		settingsError: null,
		isSettingsLoading: false,
		fetchSettings: async () => {
			useProfileSettingsStore.setState({
				settingsError: null,
				isSettingsLoading: false
			});
			try {
				const { data } =
					await $axios.get<TProfileSettings>("/profile/settings");
				set({ settings: data });
			} catch (e) {
				const err = e as AxiosError<{ message: string }>;
				set({ settingsError: err.response?.data.message });
			} finally {
				set({ isSettingsLoading: false });
			}
		}
	}))
);
