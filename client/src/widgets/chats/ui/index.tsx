"use client";

import { useState, useEffect, useRef } from "react";
import { ChatList, useChatsStore } from "@/entities/chat";
import { ChatUsers, useChatUsersQuery } from "@/entities/user";
import cl from "./index.module.scss";
import { ChatsSearch } from "./search";

export const Chats = () => {
	const chatsRef = useRef<HTMLDivElement | null>(null);
	const isMounted = useRef<boolean>(false);

	const [login, setLogin] = useState<string>("");

	const { data: users, isLoading: isUsersLoading } = useChatUsersQuery(login);
	const { isLoading: isChatsLoading, fetchChats, chats } = useChatsStore();

	useEffect(() => {
		if (isMounted.current) {
			fetchChats(login);
		}
	}, [login]); // eslint-disable-line

	useEffect(() => {
		isMounted.current = true;
	}, []);

	const skeletons = [...new Array(5)];

	const isLoading = isUsersLoading || isChatsLoading;

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
