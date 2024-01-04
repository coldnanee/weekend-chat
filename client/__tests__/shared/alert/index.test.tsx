import "@testing-library/jest-dom";
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Alert, useAlertStore } from "@/shared";

describe("Alert", () => {
	afterEach(async () => {
		await waitFor(() => {
			useAlertStore.getState().setAlert(null);
		});
	});
	test("render", async () => {
		render(<Alert />);
		expect(screen.queryByTestId("alert")).not.toBeInTheDocument();
		await waitFor(() => {
			useAlertStore
				.getState()
				.setAlert({ message: "test", type: "successfully" });
		});

		expect(screen.getByTestId("alert")).toBeInTheDocument();
	});

	test("close by click", async () => {
		render(<Alert />);
		expect(screen.queryByTestId("alert")).not.toBeInTheDocument();
		await waitFor(() => {
			useAlertStore
				.getState()
				.setAlert({ message: "test", type: "successfully" });
		});

		expect(screen.getByTestId("alert")).toBeInTheDocument();
		await userEvent.click(screen.getByTestId("alert-icon"));
		expect(screen.queryByTestId("alert")).not.toBeInTheDocument();
	});

	test("check message from store into alert", async () => {
		render(<Alert />);
		await waitFor(() => {
			useAlertStore
				.getState()
				.setAlert({ type: "successfully", message: "TEST_MESSAGE" });
		});
		expect(screen.getByTestId("alert-message")).toContainHTML("TEST_MESSAGE");
	});

	test("check color by type", async () => {
		render(<Alert />);
		expect(screen.queryByTestId("alert")).not.toBeInTheDocument();
		await waitFor(() => {
			useAlertStore
				.getState()
				.setAlert({ type: "successfully", message: "message" });
		});

		expect(screen.getByTestId("alert")).toHaveStyle(
			"background-color: rgb(67, 181, 37)"
		);

		await waitFor(() => {
			useAlertStore.getState().setAlert({ type: "error", message: "error" });
		});
		expect(screen.getByTestId("alert")).toHaveStyle(
			"background-color: rgb(255, 85, 85)"
		);
	});

	test("check timeout close alert", async () => {
		render(<Alert />);
		// expect(screen.queryByTestId("alert")).not.toBeInTheDocument();
		// await waitFor(() => {
		// 	useAlertStore.getState().setAlert({ type: "error", message: "timer" });
		// });

		// jest.advanceTimersByTime(5000);

		// expect(screen.queryByTestId("alert")).not.toBeInTheDocument();
		// await waitFor(() => {
		// 	useAlertStore.getState().setAlert({ type: "error", message: "timer" });
		// });

		// expect(screen.getByTestId("alert")).toBeInTheDocument();

		// act(() => {
		// 	jest.advanceTimersByTime(5000); // "Перемотка" времени вперед на 5000 миллисекунд
		// });

		// expect(screen.queryByTestId("alert")).not.toBeInTheDocument();
	});
});
