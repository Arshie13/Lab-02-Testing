module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  // roots: ['<rootDir>/src'],
  testRegex: "/__tests__/.*\\.spec\\.tsx$",
  transform: {
    "^.+\\.tsx?$": "@swc/jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};
