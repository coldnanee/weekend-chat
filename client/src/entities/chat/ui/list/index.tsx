"use client";

import cl from "./index.module.scss";

import { useQuery } from "@tanstack/react-query";

import { Chat } from "..";

import { fetchChatsByLogin } from "../../../../layout/ui/chats/model/fetchChatsByLogin";

export const ChatList = ({ login }: { login: string }) => {
	const { data } = useQuery({
		queryKey: ["chats", { login }],
		queryFn: () => fetchChatsByLogin(login)
	});

	return (
		<ul className={cl.root}>
			{(data || []).map((chat) => (
				<Chat
					chat={chat}
					key={chat._id}
				/>
			))}
		</ul>
	);
};
