import cl from "./index.module.scss";

import type { TUser } from "@/entities/user";

import { DefaultAvatar } from "@/shared";

import { useAppSelector } from "@/app/store/hooks/useAppSelector";

import { RiDeleteBin6Line } from "react-icons/ri";

import { useSocketContext } from "@/widgets/socket";

import type { TChat } from "@/entities/chat";

export const ChatInfo = ({ user, chat }: { user: TUser; chat?: TChat }) => {
	const { socket } = useSocketContext();

	const { users } = useAppSelector((state) => state.online);

	const deleteChat = () => {
		if (chat) socket?.emit("delete-chat", chat._id);
	};

	const showConfirmWindow = () => {
		const result = confirm("Do you want to delete the chat?");

		if (result) deleteChat();
	};

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
