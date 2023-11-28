"use client";

import { ChatsSearch } from "./search";
import { ChatUsers } from "@/entities/user";
import { ChatList } from "@/entities/chat";

import cl from "./index.module.scss";

import { useState } from "react";

import { useChatUsersQuery } from "@/entities/user";
import { useGetChatsQuery } from "@/entities/chat";

import { ChatsLoader } from "./loader";

export const Chats = () => {
	const [login, setLogin] = useState<string>("");

	const { data: users, isLoading: isUsersLoading } = useChatUsersQuery(login);
	const { data: chats, isLoading: isChatsLoading } = useGetChatsQuery(login);

	return (
		<div className={cl.root}>
			<ChatsSearch setLogin={setLogin} />
			{isChatsLoading || isUsersLoading ? (
				<ChatsLoader />
			) : (
				<>
					<ChatList
						login={login || ""}
						chats={chats?.chats}
					/>
					<ChatUsers users={users} />
				</>
			)}
		</div>
	);
};
