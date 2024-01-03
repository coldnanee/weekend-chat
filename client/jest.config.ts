import type { Config } from "jest";

import nextJest from "next/jest";

const createJestConfig = nextJest({
	dir: "./"
});

const configJest: Config = {
	clearMocks: true,
	coverageProvider: "v8",
	testEnvironment: "jest-environment-jsdom",
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"^@/pages/(.*)$": "<rootDir>/src/pages/$1"
	},
	setupFiles: ["<rootDir>/src/shared/lib/jest/setup.ts"],
	testEnvironmentOptions: {
		testURL: ""
	},
	preset: "ts-jest"
};

export default createJestConfig(configJest);
