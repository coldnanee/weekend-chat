import { create } from "zustand";

import { immer } from "zustand/middleware/immer";

type TSettingsModalStore = {
	isModalShow: boolean;
	toggleModal: () => void;
	activeChapter: string;
	setActiveChapter: (c: string) => void;
};

export const useSettingsStore = create<TSettingsModalStore>()(
	immer((set) => ({
		isModalShow: false,
		toggleModal: () =>
			set((state) => {
				state.isModalShow = !state.isModalShow;
			}),
		activeChapter: "",
		setActiveChapter: (chapter) =>
			set((state) => {
				state.activeChapter = chapter;
			})
	}))
);
