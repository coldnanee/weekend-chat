"use client";

import { ChatsSearch } from "./search";
import { ChatUsers, useChatUsersQuery } from "@/entities/user";
import { ChatList, useChatsStore } from "@/entities/chat";

import cl from "./index.module.scss";

import { useState, useEffect, useRef } from "react";

export const Chats = () => {
	const chatsRef = useRef<HTMLDivElement | null>(null);

	const [login, setLogin] = useState<string>("");

	const { data: users, isLoading: isUsersLoading } = useChatUsersQuery(login);
	const { isLoading: isChatsLoading, fetchChats, chats } = useChatsStore();

	useEffect(() => {
		fetchChats(login);
	}, [login]);

	const skeletons = [...new Array(5)];

	const isLoading = isUsersLoading || isChatsLoading;

	console.log(chatsRef.current?.getBoundingClientRect());

	return (
		<div
			className={[cl.root, "layout-chats"].join(" ")}
			ref={chatsRef}>
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
