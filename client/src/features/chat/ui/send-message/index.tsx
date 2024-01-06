"use client";

import debounce from "lodash.debounce";
import {
	KeyboardEvent,
	type ChangeEvent,
	useEffect,
	useCallback,
	useState
} from "react";
import type { MutableRefObject } from "react";
import { HiOutlinePaperAirplane } from "react-icons/hi2";
import { useMessagesStore } from "@/entities/message";
import { useProfileStore } from "@/entities/profile";
import type { TUser } from "@/entities/user";
import { useI18nStore } from "@/shared";
import { useSocketStore } from "@/shared";
import { useMessageStore } from "../../model";
import { ChatUserBlock } from "../user-block";
import cl from "./index.module.scss";

export const ChatInput = ({
	user,
	messagesContainer
}: {
	user: TUser;
	messagesContainer: MutableRefObject<HTMLElement | null>;
}) => {
	const { translate } = useI18nStore();

	const [isStartTyping, setIsStartTyping] = useState<boolean>(false);

	const { socketEvent } = useSocketStore();

	const { profile } = useProfileStore();

	const isUserBlock = profile?.blackList.includes(user._id);

	const { message, editMessage, changeMessageBody, messageBody } =
		useMessageStore();
	const { clearSelectedMessages } = useMessagesStore();

	const scrollBottom = () => {
		if (messagesContainer.current) {
			messagesContainer.current.scrollTop =
				messagesContainer.current.scrollHeight;
		}
	};

	//prettier-ignore

	const changeMessage = useCallback( // eslint-disable-line
		debounce(() => {
			socketEvent("stop-typing", {recipientId: user._id});
			setIsStartTyping(false);
		}, 500),
		[]
	);

	const changeInput = (e: ChangeEvent<HTMLInputElement>) => {
		if (!isStartTyping) {
			setIsStartTyping(true);
			socketEvent("start-typing", { recipientId: user._id });
		}
		messageBody
			? changeMessageBody({ ...messageBody, text: e.target.value })
			: editMessage(e.target.value);

		changeMessage();
	};

	const sendMessage = async () => {
		if (message) {
			socketEvent("send-message", {
				recipientId: user._id,
				message
			});
			editMessage("");
			socketEvent("stop-typing", { recipientId: user._id });
		}
	};

	const updateMessage = () => {
		if (messageBody?.text) {
			socketEvent("edit-message", {
				messageId: messageBody._id,
				updateText: messageBody.text,
				recipientId: user._id
			});
			changeMessageBody(null);
			clearSelectedMessages();
		}
	};

	const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			sendMessage();
		}
	};

	useEffect(() => {
		return () => {
			socketEvent("stop-typing", user._id);
		};
	}, []); //eslint-disable-line

	console.log(isUserBlock);

	if (isUserBlock) {
		return (
			<ChatUserBlock
				text={`You blocked ${user.login}. Unblock him to send a message.`}
			/>
		);
	}

	if (user.isBlock) {
		return <ChatUserBlock text={"You're blocked by this user"} />;
	}

	return (
		<section className={cl.root}>
			<div className={cl.root_wrapper}>
				<input
					onClick={scrollBottom}
					onChange={changeInput}
					onKeyDown={handlePressEnter}
					className={cl.root__wrapper__input}
					placeholder={translate("chat", "chat_send_message_placeholder")}
					value={messageBody ? messageBody.text : message}
					type="text"
				/>
				{(message || messageBody?.text) && (
					<HiOutlinePaperAirplane
						size="25px"
						color="#5E636C"
						className={cl.root__wrapper__input__send}
						onClick={messageBody ? updateMessage : sendMessage}
					/>
				)}
			</div>
		</section>
	);
};
