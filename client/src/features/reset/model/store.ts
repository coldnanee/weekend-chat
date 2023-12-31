import type { AxiosError } from "axios";
import { create } from "zustand";

import { immer } from "zustand/middleware/immer";
import { useAlertStore } from "@/shared";
import $axios from "@/shared";

type TResetPasswordStore = {
	email: string;
	sendLink: (e: string) => void; // eslint-disable-line no-unused-vars
	sendLinkError: string | null;
	isLinkLoading: boolean;
	clearEmail: () => void;
};

export const useResetPasswordStore = create<TResetPasswordStore>()(
	immer((set) => ({
		email: "",
		sendLinkError: null,
		isLinkLoading: false,
		sendLink: async (email) => {
			set({ isLinkLoading: true, sendLinkError: null });
			try {
				const { status } = await $axios.post("/auth/reset", { email });

				if (status === 200) {
					set({ email });
				}
			} catch (e) {
				const err = e as AxiosError<{ message: string }>;
				const message = err.response?.data.message || "";
				set({ sendLinkError: message });
				useAlertStore.getState().setAlert({ type: "error", message });
			} finally {
				set({ isLinkLoading: false });
			}
		},
		clearEmail: () => {
			set({ email: "" });
		}
	}))
);
