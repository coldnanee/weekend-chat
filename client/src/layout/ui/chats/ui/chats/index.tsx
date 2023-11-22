import { useQuery } from "@tanstack/react-query";

import { fetchChatsByLogin } from "../../model/fetchChatsByLogin";

export const ChatBySearchChats = ({ login }: { login: string }) => {
	// const { data } = useQuery({
	// 	queryKey: ["search-chats", { login }],
	// 	queryFn: () => fetchChatsByLogin(login)
	// });

	// console.log(data);

	return <>HI</>;
};
