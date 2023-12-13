import { immer } from "zustand/middleware/immer";

import type { TSession } from "@/entities/session";

import $axios from "@/shared";

import { create } from "zustand";
import type { AxiosError } from "axios";

type TSettingsSession = {
	selectedSessionsArr: string[];
	isAllSelected: boolean;
	toggleSession: (id: string) => void;
	toggleAllSessions: () => void;
	fetchSessions: () => Promise<void>;
	sessions: TSession[];
	isLoading: boolean;
	error: null | string;
};

export const useSettingsSession = create<TSettingsSession>()(
	immer((set) => ({
		selectedSessionsArr: [],
		isAllSelected: false,
		sessions: [],
		isLoading: false,
		error: null,
		toggleSession: (id) =>
			set((state) => {
				if (state.selectedSessionsArr.includes(id)) {
					state.selectedSessionsArr = state.selectedSessionsArr.filter(
						(i) => i !== id
					);
				} else {
					state.selectedSessionsArr.push(id);
				}
			}),
		fetchSessions: async () => {
			useSettingsSession.setState((state) => {
				state.isLoading = true;
				state.error = null;
			});
			try {
				const { data } = await $axios.get<{ sessions: TSession[] }>("/session");

				set({ sessions: data.sessions });
			} catch (e) {
				const err = e as AxiosError<{ message: string }>;
				set({ error: err.response?.data.message || "" });
			} finally {
				set({ isLoading: false });
			}
		},
		toggleAllSessions: () =>
			set((state) => {
				state.isAllSelected = !state.isAllSelected;
			})
	}))
);
