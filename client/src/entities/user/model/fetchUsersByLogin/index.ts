import type { TUser } from "@/entities/user";
import $axios from "@/shared";

export const fetchUsersByLogin = async (login: string) => {
	if (login) {
		try {
			const { data } = await $axios.get<{ users: TUser[] }>(
				`/users?login=${login}`
			);
			return data.users;
		} catch (e) {
			alert(e);
		}
	}
	return null;
};
