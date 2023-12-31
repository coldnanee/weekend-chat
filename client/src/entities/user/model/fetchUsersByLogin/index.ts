import type { TUser } from "@/entities/user";
import { useAlertStore } from "@/shared";
import $axios from "@/shared";

export const fetchUsersByLogin = async (login: string) => {
	if (login) {
		try {
			const { data } = await $axios.get<{ users: TUser[] }>(
				`/users?login=${login}`
			);
			return data.users;
		} catch (e) {
			const message = e as string;
			useAlertStore.getState().setAlert({ type: "error", message });
		}
	}
	return null;
};
