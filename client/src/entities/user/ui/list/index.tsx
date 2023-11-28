"use client";

import cl from "./index.module.scss";

import { ChatUser } from "..";

import type { TUser } from "../..";

export const ChatUsers = ({ users }: { users?: TUser[] | null }) => {
	if (!users) {
		return <></>;
	}

	return (
		<section className={cl.root}>
			{users.length > 0 && <h2 className={cl.root__title}>Users:</h2>}
			<ul className={cl.root__body}>
				{users.map((user) => (
					<ChatUser
						key={user._id}
						user={user}
					/>
				))}
			</ul>
		</section>
	);
};
