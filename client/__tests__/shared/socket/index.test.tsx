import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { setCookie, deleteCookie } from "cookies-next";
import { SocketProvider, useSocketStore } from "@/shared";

describe("SocketProvider", () => {
	afterEach(() => {
		deleteCookie("accessJwt");
	});
	test("render", () => {
		render(<SocketProvider>CHILDREN</SocketProvider>);
		expect(screen.getByTestId("socket-provider")).toBeInTheDocument();
		expect(screen.getByTestId("socket-provider")).toMatchSnapshot();
	});

	test("check connection auth", () => {
		const mockConnect = jest.spyOn(useSocketStore.getState().socket, "connect");

		setCookie("accessJwt", "AUTH");
		render(<SocketProvider>CHILDREN</SocketProvider>);
		expect(mockConnect).toHaveBeenCalled();
	});
	test("check connection unauth", () => {
		const mockConnect = jest.spyOn(useSocketStore.getState().socket, "connect");

		render(<SocketProvider>CHILDREN</SocketProvider>);
		expect(mockConnect).toHaveBeenCalledTimes(0);
	});
});
