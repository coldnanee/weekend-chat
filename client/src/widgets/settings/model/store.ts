import { create } from "zustand";

import { settingsCategoriesArr } from "./categories";

import { immer } from "zustand/middleware/immer";

type TSettingsModalStore = {
	isModalShow: boolean;
	changeVisibilityModal: (v: boolean) => void;
	activeChapter: string;
	setActiveChapter: (c: string) => void;
};

export const useSettingsStore = create<TSettingsModalStore>()(
	immer((set) => ({
		isModalShow: false,
		changeVisibilityModal: (visibility) =>
			set((state) => {
				state.isModalShow = visibility;
			}),
		activeChapter: settingsCategoriesArr[0].label,
		setActiveChapter: (chapter) =>
			set((state) => {
				state.activeChapter = chapter;
			})
	}))
);
