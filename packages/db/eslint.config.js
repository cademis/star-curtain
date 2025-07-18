import js from "@eslint/js";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

export default tseslint.config(
  {
    ignores: ["dist"],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: false,
        },
      },
    },
    plugins: {
      import: importPlugin,
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".ts"],
        },
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      ...importPlugin.configs.recommended.rules,
      "import/extensions": "off",
      "import/no-unresolved": "warn",
      "import/named": "warn",
      "import/no-relative-parent-imports": "warn",
    },
  }
);
