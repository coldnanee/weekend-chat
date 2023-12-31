import { connectionQueryWrapper } from "./";

describe("connectionQueryWrapper", () => {
	test("must be an empty", () => {
		expect(connectionQueryWrapper()).toBe("");
	});

	test("must be a value", () => {
		expect(connectionQueryWrapper("query")).toBe("query");
	});

	test("must be a joined string", () => {
		expect(connectionQueryWrapper(["query1", "query2"])).toBe("query1 query2");
	});

	test("must be an empty", () => {
		expect(connectionQueryWrapper([])).toBe("");
	});
});
