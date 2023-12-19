import { create } from "zustand";

import { immer } from "zustand/middleware/immer";

type TMessagesStore = {
	selectedMessages: string[];
	toggleMessage: (id: string) => void; // eslint-disable-line no-unused-vars
	clearSelectedMessages: () => void;
};

export const useMessagesStore = create<TMessagesStore>()(
	immer((set) => ({
		selectedMessages: [],
		toggleMessage: (messageId) =>
			set((state) => {
				if (state.selectedMessages.includes(messageId)) {
					state.selectedMessages = state.selectedMessages.filter(
						(m) => m !== messageId
					);
				} else {
					state.selectedMessages.push(messageId);
				}
			}),
		clearSelectedMessages: () =>
			set((state) => {
				state.selectedMessages = [];
			})
	}))
);
