import { useQuery } from "@tanstack/react-query";
import { fetchUsersByLogin } from "../../model/fetchUsersByLogin";

export const useChatUsersQuery = (login: string) =>
	useQuery({
		queryKey: ["home-users", { login }],
		queryFn: () => fetchUsersByLogin(login)
	});
