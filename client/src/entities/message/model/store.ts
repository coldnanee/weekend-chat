import { create } from "zustand";

import { immer } from "zustand/middleware/immer";

import { useMessageStore } from "@/features/chat"; // eslint-disable-line boundaries/element-types

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
					useMessageStore.getState().changeMessageBody(null);

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
				const { changeMessageBody, changeIsEdit } = useMessageStore.getState();
				changeMessageBody(null);
				changeIsEdit(false);
			})
	}))
);
