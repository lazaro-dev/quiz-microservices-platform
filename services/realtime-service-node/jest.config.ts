import type { Config } from "jest";

const config: Config = {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFiles: [
        "<rootDir>/src/tests/setup.ts"
    ],
    roots: [
        "<rootDir>/src/tests"
    ],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^@modules/(.*)$": "<rootDir>/src/modules/$1",
    },
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/**/*.d.ts",
    ],
};

export default config;