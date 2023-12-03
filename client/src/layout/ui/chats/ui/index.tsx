"use client";

import { ChatsSearch } from "./search";
import { ChatUsers } from "@/entities/user";
import { ChatList } from "@/entities/chat";

import cl from "./index.module.scss";

import { useState, useEffect } from "react";

import { useChatUsersQuery } from "@/entities/user";
import { useChatsStore } from "@/entities/chat/model/store";

export const Chats = () => {
	const [login, setLogin] = useState<string>("");

	const { data: users, isLoading: isUsersLoading } = useChatUsersQuery(login);
	const { isLoading: isChatsLoading, fetchChats, chats } = useChatsStore();

	useEffect(() => {
		fetchChats(login);
	}, [login]);

	const skeletons = [...new Array(5)];

	const isLoading = isUsersLoading || isChatsLoading;

	return (
		<div className={[cl.root, "layout-chats"].join(" ")}>
			<ChatsSearch setLogin={setLogin} />
			<ChatList
				isLoading={isLoading}
				login={login || ""}
				chats={isLoading ? skeletons : chats}
			/>
			<ChatUsers users={users} />
		</div>
	);
};
