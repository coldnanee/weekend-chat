import cl from "./index.module.scss";

import type { TUser } from "@/entities/user";

import type { TChat } from "@/entities/chat";
import { DefaultAvatar } from "@/shared";

import { useAppSelector } from "@/app/store/hooks/useAppSelector";

export const ChatInfo = ({ user }: { user: TUser }) => {
	const { users } = useAppSelector((state) => state.online);

	const isOnline = users.includes(user?._id);

	const rootClasses = [
		cl.root__body__status__icon,
		cl.root__body__status__icon_online
	];

	return (
		<div className={cl.root}>
			<div className={cl.root__body}>
				<p className={cl.root__body__name}>{user?.login}</p>
				<div className={cl.root__body__status}>
					<span
						className={
							isOnline ? rootClasses.join(" ") : cl.root__body__status__icon
						}
					/>
					<p>{isOnline ? "online" : "offline"}</p>
				</div>
				<div className={cl.root__body__info}>
					<DefaultAvatar
						src={user?.avatar}
						width={30}
						height={30}
						alt={user?.login || ""}
						className={cl.root__body__avatar}
					/>
				</div>
			</div>
		</div>
	);
};
