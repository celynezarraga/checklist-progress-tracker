module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|js)$": [
      "ts-jest",
      { babel: true, tsconfig: "tsconfig.test.json" },
    ]
  },
};