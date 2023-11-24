import $axios from "@/shared";

import type { TUser } from "@/entities/user";

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
