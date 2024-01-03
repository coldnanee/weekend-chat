import type { AxiosError } from "axios";

import type { TUser } from "@/entities/user";
import $axios from "@/shared";

export const fetchUserByLogin = async (login: string) => {
	try {
		const { data } = await $axios.get<TUser>("chats/user", {
			params: { login }
		});
		console.log(data);
		return data;
	} catch (e) {
		console.log(e);

		const err = e as AxiosError<{ message: string }>;
		return err.response?.data.message;
	}
};
