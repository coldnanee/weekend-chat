import type { Config } from "jest";

const config: Config = {
	testEnvironment: "node",
	preset: "ts-jest",
	clearMocks: true
};

export default config;
