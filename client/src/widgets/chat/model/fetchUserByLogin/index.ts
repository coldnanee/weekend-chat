import $axios from "@/shared";

import type { AxiosError } from "axios";

import type { TUser } from "@/entities/user";

export const fetchUserByLogin = async (login: string) => {
	try {
		const { data } = await $axios.get<TUser>("chats/user", {
			params: { login }
		});
		return data;
	} catch (e) {
		const err = e as AxiosError<{ message: string }>;
		return err.response?.data.message;
	}
};
