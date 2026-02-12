import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  // Configuração global
  {
    ignores: ['node_modules/', 'dist/', '.next/', 'coverage/', 'examples/', 'scripts/']
  },

  // Base: JavaScript/TypeScript
  js.configs.recommended,

  // Configuração para todos os arquivos
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
      // Regras TypeScript rigorosas
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],

      // Regras de console
      'no-console': 'error',

      // Regras de comentários
      'no-inline-comments': 'error',
      'no-warning-comments': [
        'error',
        {
          terms: ['todo', 'fixme', 'hack', 'xxx', 'note', 'debug', 'review'],
          location: 'anywhere'
        }
      ],

      // Regras de code style
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'no-nested-ternary': 'error',
      'complexity': ['error', 10],
      'max-depth': ['error', 3],
      'max-nested-callbacks': ['error', 3],

      // Regras de segurança
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-func': 'error',
      'no-script-url': 'error',

      // Regras de imports
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
