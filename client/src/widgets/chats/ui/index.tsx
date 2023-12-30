"use client";

import { AxiosError } from "axios";
import { useState, useEffect, useRef } from "react";
import { useAlertStore } from "@/features/alert";
import { ChatList, useChatsStore } from "@/entities/chat";
import { ChatUsers, useChatUsersQuery } from "@/entities/user";
import cl from "./index.module.scss";
import { ChatsSearch } from "./search";

export const Chats = () => {
	const chatsRef = useRef<HTMLDivElement | null>(null);
	const isMounted = useRef<boolean>(false);

	const [login, setLogin] = useState<string>("");

	const {
		data: users,
		isLoading: isUsersLoading,
		error
	} = useChatUsersQuery(login);
	const { isLoading: isChatsLoading, fetchChats, chats } = useChatsStore();

	useEffect(() => {
		if (isMounted.current) {
			fetchChats(login);
		}
	}, [login]); // eslint-disable-line

	useEffect(() => {
		isMounted.current = true;
	}, []);

	if (error) {
		const err = error as AxiosError<{ message: string }>;
		useAlertStore.getState().setAlert({
			type: "error",
			message: err.response?.data.message || "fetch chats error"
		});
		alert(error);
		return <></>;
	}

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
