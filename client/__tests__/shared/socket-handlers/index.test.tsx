import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { SocketHandlers } from "@/shared";

describe("SocketHandlers", () => {
	test("render", () => {
		render(<SocketHandlers />);
		expect(screen.getByTestId("socket-handlers")).toBeInTheDocument();
		expect(screen.getByTestId("socket-handlers")).toMatchSnapshot();
	});
});
