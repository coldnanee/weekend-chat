import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import LazyHomePage from "@/pages/home-page";

describe("HomePage", () => {
	test("render", async () => {
		render(<LazyHomePage />);
		await waitFor(() => {
			expect(screen.getByTestId("home-page")).toBeInTheDocument();
		});
	});
});
