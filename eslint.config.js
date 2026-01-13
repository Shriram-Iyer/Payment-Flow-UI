import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import eslintPluginAstro from 'eslint-plugin-astro';
import solid from 'eslint-plugin-solid/configs/typescript';

export default [
    eslint.configs.recommended,
    ...eslintPluginAstro.configs.recommended,
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            '@typescript-eslint': tseslint,
            solid: solid.plugins.solid,
        },
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json',
            },
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            ...solid.rules,
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            'no-console': 'warn',
        },
    },
    {
        files: ['**/*.astro'],
        rules: {
            'no-unused-vars': 'off',
        },
    },
    {
        ignores: ['dist/', 'node_modules/', '.astro/'],
    },
];
