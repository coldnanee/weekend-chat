"use client";

import cl from "./index.module.scss";

import { useQuery } from "@tanstack/react-query";

import { ChatBySearchChat } from "../chat";

import { fetchChatsByLogin } from "../../model/fetchChatsByLogin";

export const ChatBySearchChats = ({ login }: { login: string }) => {
	const { data } = useQuery({
		queryKey: ["chats", { login }],
		queryFn: () => fetchChatsByLogin(login)
	});

	return (
		<ul className={cl.root}>
			{(data || []).map((chat) => (
				<ChatBySearchChat
					chat={chat}
					key={chat._id}
				/>
			))}
		</ul>
	);
};
