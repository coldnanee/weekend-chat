import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import LazyResetPage from "@/pages/reset-page";

describe("ResetPage", () => {
	test("render", async () => {
		render(<LazyResetPage />);
		await waitFor(() => {
			expect(screen.getByTestId("reset-page")).toBeInTheDocument();
		});
	});
});
