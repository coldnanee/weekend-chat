import { getKeyByValueMap } from "./";

describe("getKeyByValueMap", () => {
	const fn = (value: string) =>
		getKeyByValueMap(
			new Map([
				["n46472hd", "user1"],
				["n464ghb!", "user2"],
				["n464ghb1!", "user2"]
			]),
			value
		);

	test("must be a value / duplicate value", () => {
		expect(fn("user2")).toBe("n464ghb!");
	});
	test("must be a null", () => {
		expect(fn("user3")).toBeNull();
	});
	test("empty map", () => {
		expect(getKeyByValueMap(new Map(), "user1")).toBeNull();
	});
});
