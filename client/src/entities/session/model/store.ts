import { create } from "zustand";

import { TSession } from "./types";
import { immer } from "zustand/middleware/immer";

type TSettingsSession = {
	allSessionListId: string[];
	selectedSessions: string[];
	toggleSession: (id: string) => void;
	setAllSessionListId: (list: string[]) => void;
	toggleAllSession: () => void;
	isAllSelected: boolean;
};

export const useSettingsSession = create<TSettingsSession>()(
	immer((set) => ({
		allSessionListId: [],
		selectedSessions: [],
		isAllSelected: false,
		setAllSessionListId: (list) =>
			set((state) => {
				state.allSessionListId = list;
			}),
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
				if (state.selectedSessions.length === state.allSessionListId.length) {
					state.selectedSessions = [];
					state.isAllSelected = false;
				} else {
					state.selectedSessions = state.allSessionListId;
					state.isAllSelected = true;
				}
			})
	}))
);
