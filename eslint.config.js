import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  /* ---------- Global ignores ---------- */
  globalIgnores(["dist", "node_modules"]),

  /* ---------- JS / JSX ---------- */
  {
    files: ["**/*.{js,jsx}"],

    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },

    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "no-undef": "error",
      "no-unused-expressions": "error",
      "no-unreachable": "error",
      "no-debugger": "error",
      eqeqeq: "error",
      curly: "error",
      "no-empty": "error",

      /* React */
      "react/jsx-no-undef": "error",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off"
    }
  },

  /* ---------- TS / TSX ---------- */
  {
    files: ["**/*.{ts,tsx}"],

    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite
    ],

    languageOptions: {
      parser: tseslint.parser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser
    },

    rules: {
      /* Disable JS rules replaced by TS */
      "no-unused-vars": "off",
      "no-undef": "off",

      /* TS equivalents */
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^[A-Z_]" }
      ],

      /* Safety & correctness */
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-non-null-assertion": "warn",

      /* General quality */
      "no-unused-expressions": "error",
      "no-unreachable": "error",
      "no-debugger": "error",
      eqeqeq: "error",
      curly: "error"
    }
  }
]);
