import "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";
import { Loader } from "@/shared";

describe("Loader", () => {
	test("render", () => {
		render(<Loader />);
		expect(screen.getByTestId("loader")).toBeInTheDocument();
	});

	test("check props class", () => {
		render(<Loader className="test-class" />);
		expect(screen.getByTestId("loader")).toHaveClass("test-class");
	});
	test("snapshot", () => {
		render(<Loader />);
		expect(screen.getByTestId("loader")).toMatchSnapshot();
	});
});
