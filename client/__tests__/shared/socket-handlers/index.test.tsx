import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { ChatSocketEvents } from "@/features/chat";

import { ProfileSocketEvents } from "@/features/profile";
import { UserSocketEvents } from "@/features/user";
import { SocketHandlers } from "@/shared";

describe("SocketHandlers", () => {
	test("render", () => {
		render(<SocketHandlers />);
		expect(screen.getByTestId("socket-handlers")).toBeInTheDocument();
		expect(screen.getByTestId("socket-handlers")).toMatchSnapshot();
	});

	test("check connection handlers", () => {
		const getMessageMock = jest.spyOn(ChatSocketEvents, "getMessageHandler");
		const sendMessageMock = jest.spyOn(ChatSocketEvents, "sendMessageHandler");
		const newChatMock = jest.spyOn(ChatSocketEvents, "newChatHandler");
		const deleteChatMock = jest.spyOn(ChatSocketEvents, "deleteChatHandler");
		const deleteMessageMock = jest.spyOn(
			ChatSocketEvents,
			"deleteMessageHandler"
		);
		const editMessageMock = jest.spyOn(ChatSocketEvents, "editMessageHandler");
		const pinChatMock = jest.spyOn(ChatSocketEvents, "pinChatHandler");
		const unpinChatMock = jest.spyOn(ChatSocketEvents, "unpinChatHandler");
		const newOnlineUserMock = jest.spyOn(
			UserSocketEvents,
			"newOnlineUserHandler"
		);
		const newOfflineUserMock = jest.spyOn(
			UserSocketEvents,
			"newOnlineUserHandler"
		);
		const logoutMock = jest.spyOn(ProfileSocketEvents, "logoutHandler");

		render(<SocketHandlers />);

		expect(getMessageMock).toHaveBeenCalled();
		expect(sendMessageMock).toHaveBeenCalled();
		expect(newChatMock).toHaveBeenCalled();
		expect(deleteChatMock).toHaveBeenCalled();
		expect(deleteMessageMock).toHaveBeenCalled();
		expect(editMessageMock).toHaveBeenCalled();
		expect(pinChatMock).toHaveBeenCalled();
		expect(unpinChatMock).toHaveBeenCalled();
		expect(newOfflineUserMock).toHaveBeenCalled();
		expect(newOnlineUserMock).toHaveBeenCalled();
		expect(logoutMock).toHaveBeenCalled();
	});
});
