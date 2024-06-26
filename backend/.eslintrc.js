module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module"
  },
  plugins: [
    "@typescript-eslint"
  ],
  "rules": {
    semi: 1,
    quotes: 1,
    "no-console": 1,
    "no-var": 2,
    "prefer-const": 2
  }
}