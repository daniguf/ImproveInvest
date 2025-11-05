// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    languageOptions: {
      globals: {
        React: "readonly",
      },
    },
  },
  {
    rules: {
      "no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          caughtErrors: "all",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  ...storybook.configs["flat/recommended"],
  {
    // 👇 This should match the `stories` property in .storybook/main.js|ts
    files: ["**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)"],
    rules: {
      // 👇 Enable this rule
      "storybook/csf-component": "error",
      // 👇 Disable this rule
      "storybook/default-exports": "off",
    },
  },
]);

export default eslintConfig;
