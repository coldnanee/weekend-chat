import { ChatInput } from "./input";
import { ChatMessages } from "./messages";

import cl from "./index.module.scss";

export const Chat = () => {
	return (
		<div className={cl.root}>
			<ChatMessages />
			<ChatInput />
		</div>
	);
};
