import type { Config } from "jest";

import nextJest from "next/jest";

const createJestConfig = nextJest({
	dir: "./"
});

const configJest: Config = {
	clearMocks: true,
	testEnvironment: "jest-environment-jsdom",
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"^@/pages/(.*)$": "<rootDir>/src/pages/$1"
	},
	setupFiles: ["<rootDir>/src/shared/lib/jest/setup.ts"],
	preset: "ts-jest"
};

export default createJestConfig(configJest);
