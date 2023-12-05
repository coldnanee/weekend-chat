import cl from "./index.module.scss";

import { useOnlineUsersStore } from "@/entities/user";

export const ChatUserOnlineStatus = ({
	userId,
	className
}: {
	userId: string;
	className?: string;
}) => {
	const users = useOnlineUsersStore((state) => state.users);

	const rootClasses = [cl.root__icon, cl.root__icon_online];

	const isOnline = users.includes(userId);

	return (
		<div className={[cl.root, className].join(" ")}>
			<span className={isOnline ? rootClasses.join(" ") : cl.root__icon} />
			<p>{isOnline ? "online" : "offline"}</p>
		</div>
	);
};
