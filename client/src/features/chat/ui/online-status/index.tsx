"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { useOnlineUsersStore } from "@/entities/user";
import type { TUser } from "@/entities/user";
import { getFormattedIsoDate } from "@/shared";
import cl from "./index.module.scss";

export const ChatUserOnlineStatus = ({
	user,
	className
}: {
	user: TUser;
	className?: string;
}) => {
	const queryClient = useQueryClient();

	const { users, offlineUser } = useOnlineUsersStore();

	const isOnline = users.includes(user._id);

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
			<p>{isOnline ? "online" : (user.lastOnline ? `last seen ${getFormattedIsoDate(user.lastOnline)}` : "last seen recently")}</p>
		</div>
	);
};
