import js from '@eslint/js'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'

export default [
  { ignores: ['dist/**', 'node_modules/**', 'ENWEIGH PHOTOS & CATALOGUES/**'] },
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs}'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      ...js.configs.recommended.rules,
      // Existing JSX imports and callback signatures are intentionally retained.
      'no-unused-vars': 'off',
    },
  },
  { files: ['**/*.{ts,tsx}'], rules: { 'no-undef': 'off' } },
]
