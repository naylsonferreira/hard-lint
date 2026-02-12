/**
 * Exemplo 1: Uso básico
 * Importa toda a configuração hard-lint
 */

// import hardlint from 'hard-lint';
// export default [...hardlint];

/**
 * Exemplo 2: Com customizações
 * Adiciona overrides para casos específicos
 */

// import hardlint from 'hard-lint';
// export default [
//   ...hardlint,
//   {
//     files: ['src/legacy/**/*.ts'],
//     rules: {
//       '@typescript-eslint/no-explicit-any': 'warn'
//     }
//   }
// ];

/**
 * Exemplo 3: Configuração para Next.js + Playwright
 * Com suporte completo para testes E2E
 */

// import hardlint from 'hard-lint';
// export default [
//   ...hardlint,
//   {
//     files: ['app/**/*.{ts,tsx}'],
//     rules: {
//       '@next/next/no-html-link-for-pages': 'error'
//     }
//   }
// ];

/**
 * Exemplo 4: Desabilitando grupos específicos
 * Se não quiser todas as regras
 */

// import js from '@eslint/js';
// import tseslint from 'typescript-eslint';
// import hardlintBase from 'hard-lint';
//
// export default [
//   ...hardlintBase,
//   {
//     files: ['scripts/**/*.js'],
//     rules: {
//       '@typescript-eslint/no-explicit-any': 'off',
//       'no-console': 'off'
//     }
//   }
// ];
