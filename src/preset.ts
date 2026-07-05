import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import type { Rule } from 'eslint';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const hardlintPlugin = {
  rules: {
    'no-comments': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Disallow comments except ESLint directives'
        },
        schema: [],
        messages: {
          noComments: 'Comments are not allowed.'
        }
      },
      create(context: Rule.RuleContext) {
        const directivePattern =
          /^eslint-(disable|enable|disable-next-line|disable-line)(\s|$)/;
        type CommentLike = {
          type: 'Line' | 'Block';
          value: string;
          loc?: {
            start: { line: number; column: number };
            end: { line: number; column: number };
          } | null;
        };

        return {
          Program() {
            const sourceCode = context.getSourceCode();
            const comments = sourceCode.getAllComments();

            comments.forEach((comment: CommentLike) => {
              const value = comment.value.trim();
              
              if (directivePattern.test(value)) {
                return;
              }

              const reportLoc =
                comment.loc ??
                ({
                  start: { line: 1, column: 0 },
                  end: { line: 1, column: 0 }
                } as {
                  start: { line: number; column: number };
                  end: { line: number; column: number };
                });

              context.report({
                loc: reportLoc,
                messageId: 'noComments'
              });
            });
          }
        };
      }
    }
  }
};

const hardlintConfig = [
  {
    ignores: ['node_modules/', 'dist/', '.next/', 'coverage/', 'examples/', 'scripts/']
  },
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      hardlint: hardlintPlugin,
      '@typescript-eslint': tseslint,
      'simple-import-sort': simpleImportSort
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
      'hardlint/no-comments': 'error',
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

      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'default', format: ['camelCase'], leadingUnderscore: 'allow' },
        { selector: 'variable', format: ['camelCase', 'UPPER_CASE', 'PascalCase'], leadingUnderscore: 'allow' },
        { selector: 'function', format: ['camelCase', 'PascalCase'] },
        { selector: 'parameter', format: ['camelCase'], leadingUnderscore: 'allow' },
        { selector: 'typeLike', format: ['PascalCase'] },
        { selector: 'enumMember', format: ['PascalCase', 'UPPER_CASE'] },
        { selector: 'import', format: ['camelCase', 'PascalCase'] },
        { selector: ['objectLiteralProperty', 'objectLiteralMethod', 'typeProperty'], format: null }
      ],

      'prefer-template': 'error',
      'object-shorthand': ['error', 'always'],
      'prefer-destructuring': ['error', { object: true, array: false }],
      'prefer-spread': 'error',
      'prefer-rest-params': 'error',
      'prefer-exponentiation-operator': 'error',
      'no-useless-concat': 'error',
      'no-useless-rename': 'error',
      'no-useless-computed-key': 'error',
      'dot-notation': 'error',

      'no-await-in-loop': 'error',
      'array-callback-return': 'error',
      'require-atomic-updates': 'error',
      'no-unmodified-loop-condition': 'error',
      'no-constant-binary-expression': 'error',
      'no-self-compare': 'error',
      'no-unreachable-loop': 'error',
      'no-promise-executor-return': 'error',
      'no-template-curly-in-string': 'error',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',

      'sort-imports': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error'
    }
  }
];

export default hardlintConfig;