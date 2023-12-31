import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { TAlert } from "./types";

type TAlertStore = {
	alert: TAlert;
	setAlert: (alert: TAlert) => void; // eslint-disable-line no-unused-vars
};

export const useAlertStore = create<TAlertStore>()(
	immer((set) => ({
		alert: null,
		setAlert: (alert) =>
			set((state) => {
				state.alert = alert;
			})
	}))
);
