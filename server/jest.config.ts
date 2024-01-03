import type { Config } from "jest";

const config: Config = {
	testEnvironment: "node",
	preset: "ts-jest",
	clearMocks: true,
	setupFiles: ["./src/libs/setup-env.ts"]
};

export default config;
