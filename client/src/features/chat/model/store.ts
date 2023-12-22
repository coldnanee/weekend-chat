import { create } from "zustand";

import { immer } from "zustand/middleware/immer";

import type { TMessage } from "@/entities/message";

type TMessageStore = {
	message: string;
	messageBody: TMessage | null;
	editMessage: (m: string) => void; // eslint-disable-line no-unused-vars
	changeMessageBody: (m: TMessage | null) => void; // eslint-disable-line no-unused-vars
	isEdit: boolean;
	changeIsEdit: (e: boolean) => void; // eslint-disable-line no-unused-vars
};

export const useMessageStore = create<TMessageStore>()(
	immer((set) => ({
		message: "",
		isEdit: false,
		messageBody: null,
		editMessage: (message) =>
			set((state) => {
				state.message = message;
			}),
		changeIsEdit: (e) =>
			set((state) => {
				state.isEdit = e;
			}),
		changeMessageBody: (m) =>
			set((state) => {
				state.messageBody = m;
			})
	}))
);
