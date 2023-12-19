import Link from "next/link";
import type { TUser } from "@/entities/user";
import { DefaultAvatar } from "@/shared";
import cl from "./index.module.scss";

export const ChatUser = ({ user }: { user: TUser }) => {
	return (
		<li className={cl.root}>
			<Link
				href={`/chat/${user.login}`}
				className={cl.root__body}>
				<DefaultAvatar
					className={cl.root__body__avatar}
					src={user.avatar}
					width={30}
					height={30}
					alt={user.login}
				/>
				<p className={cl.root__body__login}>{user.login}</p>
			</Link>
		</li>
	);
};
