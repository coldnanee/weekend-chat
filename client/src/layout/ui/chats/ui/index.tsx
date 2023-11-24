"use client";

import { ChatsSearch } from "./search";
import { ChatUsers } from "@/entities/user";
import { ChatList } from "@/entities/chat";

import cl from "./index.module.scss";

import { useState } from "react";

export const Chats = () => {
	const [login, setLogin] = useState<string>("");

	return (
		<div className={cl.root}>
			<ChatsSearch setLogin={setLogin} />
			<ChatList login={login} />
			<ChatUsers login={login} />
		</div>
	);
};
