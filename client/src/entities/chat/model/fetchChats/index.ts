import $axios from "@/shared";

import type { AxiosError } from "axios";

import type { TChat } from "../types";

export const fetchChatsByLogin = async (chat: string) => {
	try {
		const { data } = await $axios.get<{ chats: TChat[] }>("chats", {
			params: { chat }
		});
		return { data };
	} catch (e) {
		const axiosError = e as AxiosError;
		return {
			error: {
				status: axiosError.response?.status || 500,
				data: axiosError.response?.data
			}
		};
	}
};
