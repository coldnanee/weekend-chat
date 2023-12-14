import $axios from "@/shared";

import type { TSession } from "../types";

export const fetchSessions = async () => {
	const { data } = await $axios.get<{ sessions: TSession[] }>("/session");
	return data;
};
