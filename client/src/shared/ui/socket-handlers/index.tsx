import { ChatSocketEvents } from "@/features/chat"; // eslint-disable-line boundaries/element-types
import { ProfileSocketEvents } from "@/features/profile"; // eslint-disable-line boundaries/element-types
import { UserSocketEvents } from "@/features/user"; // eslint-disable-line boundaries/element-types

export const SocketHandlers = () => {
	ChatSocketEvents.getMessageHandler();
	ChatSocketEvents.sendMessageHandler();
	UserSocketEvents.newOnlineUserHandler();
	UserSocketEvents.newOfflineUserHandler();
	ChatSocketEvents.newChatHandler();
	ChatSocketEvents.deleteChatHandler();
	ChatSocketEvents.deleteMessageHandler();
	ProfileSocketEvents.logoutHandler();
	ChatSocketEvents.editMessageHandler();
	ChatSocketEvents.pinChatHandler();
	ChatSocketEvents.unpinChatHandler();

	return <div data-testid="socket-handlers"></div>;
};
