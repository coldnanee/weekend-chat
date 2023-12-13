import { useQuery } from "@tanstack/react-query";

import { fetchSessions } from "../../model/fetchSessions";

export const useGetSessions = () =>
	useQuery({
		queryFn: fetchSessions,
		queryKey: ["settings-sessions"]
	});
