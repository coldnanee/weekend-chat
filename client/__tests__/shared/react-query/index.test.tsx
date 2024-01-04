import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { ReactQueryProvider } from "@/shared";

describe("ReactQueryProvider", () => {
	test("render", () => {
		render(<ReactQueryProvider>CHILDREN</ReactQueryProvider>);
		expect(screen.getByTestId("react-query-provider")).toBeInTheDocument();
		expect(screen.getByTestId("react-query-provider")).toMatchSnapshot();
	});
});
