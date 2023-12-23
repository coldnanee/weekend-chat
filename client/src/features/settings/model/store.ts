import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type TAvatarStore = {
	isMenuShow: boolean;
	setMenuShow: (s: boolean) => void; //eslint-disable-line no-unused-vars
};

export const useAvatarStore = create<TAvatarStore>()(
	immer((set) => ({
		isMenuShow: false,
		setMenuShow: (s) =>
			set((state) => {
				state.isMenuShow = s;
			})
	}))
);
