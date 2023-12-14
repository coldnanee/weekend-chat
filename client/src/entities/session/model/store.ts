import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import type { TSession } from "./types";

import type { AxiosError } from "axios";
import $axios from "@/shared";

type TSettingsSession = {
	sessions: TSession[];
	isSessionsLoading: boolean;
	sessionsError: null | string;
	selectedSessions: string[];
	toggleSession: (id: string) => void;
	toggleAllSession: () => void;
	killSessions: () => void;
	isAllSelected: boolean;
	fetchSessions: () => void;
};

export const useSettingsSession = create<TSettingsSession>()(
	immer((set, get) => ({
		sessions: [],
		selectedSessions: [],
		isAllSelected: false,
		isSessionsLoading: false,
		sessionsError: null,
		toggleSession: (id) =>
			set((state) => {
				if (state.selectedSessions.includes(id)) {
					state.selectedSessions = state.selectedSessions.filter(
						(i) => i !== id
					);
				} else {
					state.selectedSessions.push(id);
				}
			}),
		toggleAllSession: () =>
			set((state) => {
				if (state.selectedSessions.length === state.sessions.length) {
					state.selectedSessions = [];
					state.isAllSelected = false;
				} else {
					state.selectedSessions = state.sessions.map((s) => s._id);
					state.isAllSelected = true;
				}
			}),
		killSessions: async () => {
			set({ isSessionsLoading: true, sessionsError: null });
			try {
				let sessions = "";

				get().selectedSessions.forEach((id, index) => {
					sessions += `${id}${
						get().selectedSessions.length - 1 !== index ? "-" : ""
					}`;
				});

				const { status } = await $axios.delete("/session/kill", {
					params: { sessions }
				});

				if (status == 200) {
					set((state) => {
						state.sessions = state.sessions.filter(
							(s) => !sessions.includes(s._id)
						);
						state.selectedSessions = [];
						state.isAllSelected = false;
					});
				}
			} catch (e) {
				const err = e as AxiosError<{ message: string }>;
				set({ sessionsError: err.response?.data.message || "" });
			} finally {
				set({ isSessionsLoading: false });
			}
		},
		fetchSessions: async () => {
			set({ isSessionsLoading: true, sessionsError: null });
			try {
				const { data } = await $axios.get<{ sessions: TSession[] }>("/session");
				set({ sessions: data.sessions });
			} catch (e) {
				const err = e as AxiosError<{ message: string }>;
				set({ sessionsError: err.response?.data.message || "" });
			} finally {
				set({ isSessionsLoading: false });
			}
		}
	}))
);
