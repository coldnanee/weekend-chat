import { RxCross2 } from "react-icons/rx";

import type { TChat } from "@/entities/chat";
import { useMessagesStore } from "@/entities/message";
import { useSocketContext } from "@/shared";
import cl from "./index.module.scss";

import { useSocketContext } from "@/shared"; // eslint-disable-line import/order

export const ChatMessagesPanel = ({ chat }: { chat?: TChat }) => {
	const { selectedMessages, clearSelectedMessages } = useMessagesStore();

	const { socket } = useSocketContext();

	const deleteMessages = () => {
		socket?.emit("delete-message", chat?._id, selectedMessages);
	};

	return (
		<div className={cl.root}>
			<div className={cl.root__body}>
				<div className={cl.root__body__info}>
					<RxCross2
						size="23"
						color="#a9aeba"
						onClick={clearSelectedMessages}
						className={cl.root__body__info__image}
					/>
					<div className={cl.root__body__info__text}>
						<span>{selectedMessages.length}</span>
						<p>Messages</p>
					</div>
				</div>
				<button
					className={cl.root__body__button}
					onClick={deleteMessages}>
					Delete
				</button>
			</div>
		</div>
	);
};
