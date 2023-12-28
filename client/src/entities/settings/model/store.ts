import { AxiosError } from "axios";
import { create } from "zustand";

import { immer } from "zustand/middleware/immer";

import { useAlertStore } from "@/features/alert"; // eslint-disable-line boundaries/element-types
import $axios from "@/shared";

import type { TProfileSettings, TLanguageSelect } from "../types";

import { languagesItemsArr } from ".";

type TProfileSettingsStore = {
	settings: TProfileSettings | null;
	fetchSettings: () => void;
	settingsError: null | string;
	isSettingsLoading: boolean;
	updateProfileSettings: () => void;
	select: TLanguageSelect;
	setSelect: (select: TLanguageSelect) => void; // eslint-disable-line no-unused-vars
};

export const useProfileSettingsStore = create<TProfileSettingsStore>()(
	immer((set, get) => ({
		settings: null,
		select: {
			isShow: false,
			language: ""
		},
		setSelect: (s) =>
			set((state) => {
				state.select = s;
			}),
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
		},
		updateProfileSettings: async () => {
			const { select } = get();
			const languageCode =
				languagesItemsArr.find((l) => select.language === l.label)?.value ||
				"en";

			try {
				const { status } = await $axios.post("/profile/settings-update", {
					language: languageCode
				});

				if (status == 200) {
					window && window.location.reload();
				}
			} catch (e) {
				const err = e as AxiosError<{ message: string }>;
				useAlertStore.getState().setAlert({
					type: "error",
					message: err.response?.data.message || ""
				});
			}
		}
	}))
);
