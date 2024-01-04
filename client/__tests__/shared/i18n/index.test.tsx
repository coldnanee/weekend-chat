import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { I18nProvider } from "@/shared";

describe("I18nProvider", () => {
	test("render", () => {
		render(
			<I18nProvider>
				<div data-testid="i18n-provider-test-child">CHILDREN</div>
			</I18nProvider>
		);
		expect(screen.getByTestId("i18n-provider")).toBeInTheDocument();
		expect(screen.getByTestId("i18n-provider")).toMatchSnapshot();
	});
});
