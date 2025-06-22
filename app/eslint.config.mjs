import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

import parserTypescript from '@typescript-eslint/parser'
import pluginTypescript from '@typescript-eslint/eslint-plugin'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import pluginPrettier from 'eslint-plugin-prettier'
import pluginUnusedImports from 'eslint-plugin-unused-imports'
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import pluginSortKeysFix from 'eslint-plugin-sort-keys-fix'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

export default [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        files: ['**/*.{js,ts,jsx,tsx}'],
        languageOptions: {
            parser: parserTypescript,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
            },
        },
        settings: {
            react: { version: 'detect' },
        },
        plugins: {
            '@typescript-eslint': pluginTypescript,
            react: pluginReact,
            'react-hooks': pluginReactHooks,
            prettier: pluginPrettier,
            'unused-imports': pluginUnusedImports,
            'simple-import-sort': pluginSimpleImportSort,
            'sort-keys-fix': pluginSortKeysFix,
        },
        rules: {
            'prettier/prettier': [
                'error',
                {
                    semi: false,
                    singleQuote: true,
                    trailingComma: 'es5',
                    printWidth: 100,
                    arrowParens: 'avoid',
                },
            ],

            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                { vars: 'all', varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            'sort-keys-fix/sort-keys-fix': 'warn',

            'react/react-in-jsx-scope': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',

            '@typescript-eslint/explicit-function-return-type': 'off',

            'no-console': ['warn', { allow: ['warn', 'error'] }],
        },
    },
]