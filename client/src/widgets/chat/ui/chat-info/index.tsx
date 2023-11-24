import cl from "./index.module.scss";

import { RiDeleteBin6Line } from "react-icons/ri";

import type { TUser } from "@/entities/user";

import type { TChat } from "@/entities/chat";

import PinnedImage from "../../images/pinned.svg";

import Image from "next/image";
import { DefaultAvatar } from "@/shared";

export const ChatInfo = ({
	user,
	chat
}: {
	user?: TUser;
	chat: TChat | null;
}) => {
	const isOnline = false;

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
					{/* <RiDeleteBin6Line
						color="#a6abb7"
						size="20px"
					/>
					<Image
						width={20}
						height={20}
						alt="pinned"
						src={PinnedImage}
					/> */}
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
