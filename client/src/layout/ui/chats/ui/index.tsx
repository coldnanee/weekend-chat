"use client";

import { ChatsSearch } from "./search";
import { ChatsUsers } from "./users";
import { ChatBySearchChats } from "./chats";

import cl from "./index.module.scss";

import { useState } from "react";

export const Chats = () => {
	const [login, setLogin] = useState<string>("");

	return (
		<div className={cl.root}>
			<ChatsSearch setLogin={setLogin} />
			<ChatBySearchChats login={login} />
			<ChatsUsers login={login} />
		</div>
	);
};
