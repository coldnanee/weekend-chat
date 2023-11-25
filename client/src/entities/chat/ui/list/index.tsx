"use client";

import cl from "./index.module.scss";

import { useQuery } from "@tanstack/react-query";

import { useGetChatsQuery } from "../..";

import { Chat } from "..";
import { TChat } from "../..";

// import { fetchChatsByLogin } from "../../../../layout/ui/chats/model/fetchChatsByLogin";

export const ChatList = ({ login }: { login: string }) => {
	// const { data } = useQuery({
	// 	queryKey: ["chats", { login }],
	// 	queryFn: () => fetchChatsByLogin(login)
	// });

	const { data } = useGetChatsQuery(login);

	if (!data) {
		return <></>;
	}

	return (
		<ul className={cl.root}>
			{(data.chats || []).map((chat) => (
				<Chat
					chat={chat}
					key={chat._id}
				/>
			))}
		</ul>
	);
};
