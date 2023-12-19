import { create } from "zustand";

import { immer } from "zustand/middleware/immer";
import { settingsCategoriesArr } from "./categories";

type TSettingsModalStore = {
	isModalShow: boolean;
	changeVisibilityModal: (v: boolean) => void; // eslint-disable-line no-unused-vars
	activeChapter: string;
	setActiveChapter: (c: string) => void; // eslint-disable-line no-unused-vars
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
