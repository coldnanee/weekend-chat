"use client";

import cl from "./index.module.scss";

import { useGetChatsQuery } from "../..";

import { Chat } from "..";

export const ChatList = ({ login }: { login: string }) => {
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
