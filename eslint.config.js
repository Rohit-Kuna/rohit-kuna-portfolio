import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['node_modules', 'dist'],

    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },

    rules: {
      // 🔥 STRICT RULES
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'no-undef': 'error', // catch undefined variables like dockRef, toggleApp
      'no-unused-expressions': 'error',
      'no-unreachable': 'error',
      'no-debugger': 'error',
      'eqeqeq': 'error',
      'curly': 'error',
      'no-empty': 'error',

      // React / JSX Safety
      'react/jsx-no-undef': 'error', // undefined component in JSX
      'react/prop-types': 'off', // don't force PropTypes for JS
      'react/react-in-jsx-scope': 'off', // React 17+ no need to import React
    },
  },
]);
