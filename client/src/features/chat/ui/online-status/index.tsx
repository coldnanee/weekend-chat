"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { useOnlineUsersStore } from "@/entities/user";
import type { TUser } from "@/entities/user";
import { useI18nStore } from "@/shared";
import { getFormattedIsoDate } from "@/shared";
import cl from "./index.module.scss";

export const ChatUserOnlineStatus = ({
	user,
	className
}: {
	user: TUser;
	className?: string;
}) => {
	const { translate } = useI18nStore();
	const queryClient = useQueryClient();

	const { users, offlineUser } = useOnlineUsersStore();

	const isOnline = users.includes(user._id);

	const { label, isTranslate, count } = getFormattedIsoDate(user.lastOnline);

	const messageDate = isTranslate
		? `${count || ""}${translate("other", label)}`
		: label;

	useEffect(() => {
		if (offlineUser === user._id) {
			const date = new Date().toISOString();
			queryClient.setQueryData(
				[
					"user-by-login",
					{
						login: user.login
					}
				],
				{ ...user, lastOnline: date }
			);
		}
	}, [users]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className={[cl.root, className].join(" ")}>
			{isOnline && <span className={cl.root__icon_online} />}
			{/* prettier-ignore */}
			<p>{isOnline ? translate("other", "user_seen_online") : (user.lastOnline ? `${translate("other", label === "user_seen_yesterday" ? "user_last_seen_non_in" : "user_last_seen")} ${messageDate}` : translate("other","user_seen_recently"))}</p>
		</div>
	);
};
