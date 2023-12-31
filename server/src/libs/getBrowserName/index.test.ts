import { getBrowserName } from ".";

export type TBrowserInfo = {
	os: string;
	name: string;
	version: string;
	type: string;
} | null;

describe("getBrowserName", () => {
	test("must be a browser name + version", () => {
		const browser: TBrowserInfo = {
			name: "chrome",
			version: "1.9.2v",
			type: "browser",
			os: "Android"
		};

		expect(getBrowserName(browser)).toBe("chrome 1.9.2v");
	});

	test("must be a type request object", () => {
		const browser: TBrowserInfo = {
			name: "name",
			version: "version",
			type: "something",
			os: "Android"
		};

		expect(getBrowserName(browser)).toBe("something");
	});

	test("must be a null", () => {
		const browser: TBrowserInfo = null;

		expect(getBrowserName(browser)).toBe("");
	});
});
