import { useI18nStore } from "@/shared";
import type { TChat } from "../..";

import { ChatSkeleton } from "../..";
import { ChatItem } from "../item";
import cl from "./index.module.scss";

export const ChatList = ({
	chats,
	isLoading,
	login
}: {
	chats?: TChat[];
	isLoading: boolean;
	login: string;
}) => {
	const { translate } = useI18nStore();

	if (!chats) {
		return <></>;
	}

	if (chats.length === 0) {
		return <></>;
	}

	return (
		<section className={cl.root}>
			{isLoading && login && chats.length > 0 && (
				<h2 className={cl.root__title}>{translate("aside_chats_chats")}</h2>
			)}
			{/* prettier-ignore */}
			<ul className={cl.root__body}>
				{isLoading
					? (chats || []).map((_, index) => <ChatSkeleton key={index} />)
					: (chats || []).map((chat) => (
							<ChatItem
								chat={chat}
								key={chat._id}
							/>
				))}
			</ul>
		</section>
	);
};
