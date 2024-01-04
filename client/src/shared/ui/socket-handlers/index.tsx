import {
	getMessageHandler,
	newChatHandler,
	sendMessageHandler,
	deleteChatHandler,
	deleteMessageHandler,
	editMessageHandler,
	pinChatHandler,
	unpinChatHandler
} from "@/features/chat"; // eslint-disable-line boundaries/element-types
import { logoutHandler } from "@/features/profile"; // eslint-disable-line boundaries/element-types
import { newOnlineUserHandler, newOfflineUserHandler } from "@/features/user"; // eslint-disable-line boundaries/element-types

export const SocketHandlers = () => {
	getMessageHandler();
	sendMessageHandler();
	newOnlineUserHandler();
	newOfflineUserHandler();
	newChatHandler();
	deleteChatHandler();
	deleteMessageHandler();
	logoutHandler();
	editMessageHandler();
	pinChatHandler();
	unpinChatHandler();

	return <div data-testid="socket-handlers"></div>;
};
