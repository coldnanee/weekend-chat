import { RxCross2 } from "react-icons/rx";

import type { TChat } from "@/entities/chat";
import { useMessagesStore } from "@/entities/message";
import { useProfileStore } from "@/entities/profile";
import { useI18nStore } from "@/shared";
import { useSocketStore } from "@/shared";
import { useMessageStore } from "../../model";
import cl from "./index.module.scss";

export const ChatMessagesPanel = ({ chat }: { chat?: TChat }) => {
	const { selectedMessages, clearSelectedMessages } = useMessagesStore();

	const { translate } = useI18nStore();

	const { changeMessageBody, changeIsEdit } = useMessageStore();
	const { profile } = useProfileStore();
	const { socketEvent } = useSocketStore();

	const deleteMessages = () => {
		socketEvent("delete-message", { chatId: chat?._id, selectedMessages });
	};

	const message = chat?.messages.filter((m) =>
		selectedMessages.includes(m._id)
	)[0];

	const changeMessage = () => {
		if (message) {
			changeMessageBody(message);
			changeIsEdit(true);
		}
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
						<p>{translate("chat", "chat_messages_panel_title")}</p>
					</div>
				</div>
				<div className={cl.root__body__buttons}>
					{selectedMessages.length === 1 && profile?._id === message?.user && (
						<button
							className={cl.root__body__buttons__button}
							onClick={changeMessage}>
							{translate("chat", "chat_messages_panel_edit")}
						</button>
					)}
					<button
						className={cl.root__body__buttons__button}
						onClick={deleteMessages}>
						{translate("chat", "chat_messages_panel_edit")}
					</button>
				</div>
			</div>
		</div>
	);
};
