import type { TChat } from "@/entities/chat";

import cl from "./index.module.scss";

export const ChatBySearchChat = ({ chat }: { chat: TChat }) => {
	return <li className={cl.root}>{chat._id}</li>;
};
