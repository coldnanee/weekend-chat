import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import LazySupportPage from "./ui";

describe("SupportPage", () => {
	test("render", async () => {
		render(<LazySupportPage />);
		await waitFor(() => {
			expect(screen.getByTestId("support-page")).toBeInTheDocument();
		});
	});
});
