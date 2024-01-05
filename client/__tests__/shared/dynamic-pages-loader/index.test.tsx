import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { DynamicPagesLoader } from "@/shared";

describe("DynamicPagesLoader", () => {
	test("render", () => {
		render(<DynamicPagesLoader />);
		expect(screen.getByTestId("dynamic-pages-loader")).toBeInTheDocument();
		expect(screen.getByTestId("dynamic-pages-loader")).toMatchSnapshot();
	});
});
