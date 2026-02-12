import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

const hardlintConfig = [
  {
    ignores: ['node_modules/', 'dist/', '.next/', 'coverage/', 'examples/', 'scripts/']
  },
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      '@typescript-eslint': tseslint
    },
    languageOptions: {
      parser: tsparser,
      globals: {
        module: 'readonly',
        require: 'readonly'
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      'no-console': 'error',
      'no-inline-comments': 'error',
      'no-warning-comments': [
        'error',
        {
          terms: ['todo', 'fixme', 'hack', 'xxx', 'note', 'debug', 'review'],
          location: 'anywhere'
        }
      ],
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'no-nested-ternary': 'error',
      complexity: ['error', 10],
      'max-depth': ['error', 3],
      'max-nested-callbacks': ['error', 3],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreMemberSort: true
        }
      ]
    }
  }
];

export default hardlintConfig;