import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { DefaultAvatar } from "@/shared";

describe("DefaultAvatar", () => {
	test("render", () => {
		render(
			<DefaultAvatar
				alt="image"
				width={40}
				height={40}
			/>
		);
		expect(screen.getByTestId("default-avatar")).toBeInTheDocument();
		expect(screen.getByTestId("default-avatar")).toMatchSnapshot();
	});

	test("check image default", () => {
		render(
			<DefaultAvatar
				width={50}
				height={50}
				alt="default"
			/>
		);
		expect(
			screen.getByTestId("default-avatar").getAttribute("src")
		).not.toBeNull();
	});

	test("check correct props", () => {
		render(
			<DefaultAvatar
				width={25}
				height={25}
				alt="default"
				className="RANDOM_CLASS"
				src="http://RANDOM_SRC.jpg"
			/>
		);
		expect(
			screen.getByTestId("default-avatar").getAttribute("src")
		).not.toBeNull();
		expect(screen.getByTestId("default-avatar")).toHaveClass("RANDOM_CLASS");
	});
});
