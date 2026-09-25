import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginSortKeysFix from 'eslint-plugin-sort-keys-fix'
import pluginUnusedImports from 'eslint-plugin-unused-imports'

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    files: ['**/*.{js,mjs,ts,tsx}'],
    plugins: {
      prettier: pluginPrettier,
      'simple-import-sort': pluginSimpleImportSort,
      'sort-keys-fix': pluginSortKeysFix,
      'unused-imports': pluginUnusedImports,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prettier/prettier': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'simple-import-sort/exports': 'error',
      'simple-import-sort/imports': 'error',
      'sort-keys-fix/sort-keys-fix': 'warn',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', vars: 'all', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: ['src/i18n/messages/**'],
    rules: { 'sort-keys-fix/sort-keys-fix': 'off' },
  },
])
