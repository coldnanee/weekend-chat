"use client";

import { useQuery } from "@tanstack/react-query";

import { ChatBySearchChat } from "../chat";

import { fetchChatsByLogin } from "../../model/fetchChatsByLogin";

export const ChatBySearchChats = ({ login }: { login: string }) => {
	const { data } = useQuery({
		queryKey: ["search-chats", { login }],
		queryFn: () => fetchChatsByLogin(login)
	});

	console.log(data);

	if (!data) {
		return <></>;
	}

	return (
		<ul>
			{data.map((chat) => (
				<ChatBySearchChat
					chat={chat}
					key={chat._id}
				/>
			))}
		</ul>
	);
};
