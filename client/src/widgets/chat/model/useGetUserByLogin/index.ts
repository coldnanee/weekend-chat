import { useQuery } from "@tanstack/react-query";

import { fetchUserByLogin } from "../fetchUserByLogin";

export const useGetUserByLogin = (login: string) =>
	useQuery({
		queryKey: ["user-by-login", { login }],
		queryFn: () => fetchUserByLogin(login)
	});
