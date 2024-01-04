import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { Providers } from "@/app/providers";

describe("Providers", () => {
	test("render", async () => {
		render(<Providers>CHILDREN</Providers>);
		await waitFor(() => {
			expect(screen.getByTestId("providers")).toBeInTheDocument();
		});
	});
});
