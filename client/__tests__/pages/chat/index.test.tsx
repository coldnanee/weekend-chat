import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import LazyChatPage from "@/pages/chat-page";

describe("ChatPage", () => {
	test("render", async () => {
		render(<LazyChatPage />);
		await waitFor(() => {
			expect(screen.getByTestId("chat-page")).toBeInTheDocument();
		});
	});
});
