import type { Config } from "jest";

import nextJest from "next/jest";

const createJestConfig = nextJest({
	dir: "./"
});

const config: Config = {
	clearMocks: true,
	coverageProvider: "v8",
	testEnvironment: "jsdom",
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"^@/pages/(.*)$": "<rootDir>/src/pages/$1"
	}
};

export default createJestConfig(config);
