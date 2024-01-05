import { create } from "zustand";

import { immer } from "zustand/middleware/immer";
import { useAlertStore } from "@/shared";
import $axios from "@/shared";

type TDictionaryPage = {
	[key: string]: string;
};

type TDictionary = {
	[key: string]: TDictionaryPage;
};

type TI18nStore = {
	dictionary: TDictionary | null;
	fetchDictionary: () => void;
	isDictionaryLoading: boolean;
	translate: (ctx: string, key: string) => string; // eslint-disable-line no-unused-vars
};

export const useI18nStore = create<TI18nStore>()(
	immer((set, get) => ({
		dictionary: null,
		isDictionaryLoading: false,
		fetchDictionary: async () => {
			set({ isDictionaryLoading: true });
			try {
				const { data } = await $axios.get<TDictionary>("/profile/dictionaries");

				set({ dictionary: data });
			} catch (e) {
				useAlertStore
					.getState()
					.setAlert({ type: "error", message: "Dictionary loading error" });
				window && window.location.reload();
			} finally {
				set({ isDictionaryLoading: false });
			}
		},
		translate: (ctx, key) => {
			const { dictionary } = get();

			if (dictionary && dictionary[ctx] && dictionary[ctx][key]) {
				return dictionary[ctx][key];
			}

			return "";
		}
	}))
);
