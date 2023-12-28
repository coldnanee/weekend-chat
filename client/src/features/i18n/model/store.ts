import { getCookie } from "cookies-next";
import { create } from "zustand";

import { immer } from "zustand/middleware/immer";
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
	translate: (key: string) => string; // eslint-disable-line no-unused-vars
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
				alert("Dictionary loading error");
				window && window.location.reload();
			} finally {
				set({ isDictionaryLoading: false });
			}
		},
		translate: (k) => {
			const { dictionary } = get();

			const activePage = getCookie("activePage") as string;

			return activePage && dictionary && dictionary[activePage]
				? dictionary[activePage][k]
				: "";
		}
	}))
);
