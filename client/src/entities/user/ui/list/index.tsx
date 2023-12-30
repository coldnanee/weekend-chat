"use client";

import { useI18nStore } from "@/shared";
import type { TUser } from "../../types";
import { ChatUser } from "../item";

import cl from "./index.module.scss";

export const ChatUsers = ({ users }: { users?: TUser[] | null }) => {
	const { translate } = useI18nStore();

	if (!users) {
		return <></>;
	}

	return (
		<section className={cl.root}>
			{users.length > 0 && (
				<h2 className={cl.root__title}>{translate("aside_chats_users")}</h2>
			)}
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
