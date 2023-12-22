import Link from "next/link";

import { IoIosArrowBack } from "react-icons/io";
import { ChatUserOnlineStatus } from "@/features/chat";
import type { TChat } from "@/entities/chat";
import { type TUser } from "@/entities/user";
import { DefaultAvatar } from "@/shared";

import { ChatMenu } from "../chat-menu";
import cl from "./index.module.scss";
export const ChatInfo = ({ user, chat }: { user: TUser; chat?: TChat }) => {
	return (
		<div className={cl.root}>
			<div className={cl.root__body}>
				<Link
					href="/"
					className={cl.root__body__link}>
					<IoIosArrowBack
						size="25px"
						color="#6C6F75"
						className={cl.root__body__link__arrow}
					/>
				</Link>
				<p className={cl.root__body__name}>{user.login}</p>
				<ChatUserOnlineStatus
					userId={user._id}
					className={cl.root__body__status}
				/>
				<div className={cl.root__body__adaptive}>
					<p className={cl.root__body__adaptive__name}>{user.login}</p>
					<ChatUserOnlineStatus userId={user._id} />
				</div>
				<div className={cl.root__body__info}>
					<ChatMenu chat={chat} />
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
