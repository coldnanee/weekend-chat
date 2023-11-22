import cl from "./index.module.scss";

import type { TUser } from "@/entities/user";

import DefaultAvatar from "../../images/default-avatar.svg";

import Link from "next/link";

import Image from "next/image";

export const ChatsUser = ({ user }: { user: TUser }) => {
	return (
		<li className={cl.root}>
			<Link
				href={`/chat/${user.login}`}
				className={cl.root__body}>
				<Image
					className={cl.root__body__avatar}
					src={user.avatar || DefaultAvatar}
					width={30}
					height={30}
					alt={user.login}
					priority
				/>
				<p className={cl.root__body__login}>{user.login}</p>
			</Link>
		</li>
	);
};
