import cl from "./index.module.scss";

import { DefaultAvatar } from "@/shared";

import { type TUser } from "@/entities/user";

import { ChatUserOnlineStatus } from "../online-status";

import { RiDeleteBin6Line } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";

import { useSocketContext } from "@/widgets/socket";

import type { TChat } from "@/entities/chat";
import Link from "next/link";

export const ChatInfo = ({ user, chat }: { user: TUser; chat?: TChat }) => {
	const { socket } = useSocketContext();

	const deleteChat = () => {
		if (chat) socket?.emit("delete-chat", chat._id);
	};

	const showConfirmWindow = () => {
		const result = confirm("Do you want to delete the chat?");

		if (result) deleteChat();
	};

	return (
		<div className={cl.root}>
			<div className={cl.root__body}>
				<Link href="/">
					<IoIosArrowBack
						size="25px"
						color="#6C6F75"
						className={cl.root__body__arrow}
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
					<button
						className={cl.root__body__info__delete}
						onClick={showConfirmWindow}>
						<RiDeleteBin6Line
							color="#6C6F75"
							size="20px"
							className={cl.root__body__info__delete__image}
						/>
					</button>
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
