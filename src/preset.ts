import js from '@eslint/js';
import type { Rule } from 'eslint';
import tsparser from '@typescript-eslint/parser';

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
              
              // Only allow ESLint directives
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
      hardlint: hardlintPlugin
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