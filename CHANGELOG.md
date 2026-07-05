# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto segue [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

---

## [0.5.0] - 2026-07-05

Conjunto de regras rigorosas e validações estruturais para projetos TypeScript.

### Added

- **Naming conventions** (`@typescript-eslint/naming-convention`): PascalCase para tipos/interfaces, camelCase para variáveis/funções, UPPER_CASE para constantes, etc.
- **Modernização de sintaxe**: `prefer-template`, `object-shorthand`, `prefer-destructuring`, `prefer-spread`, `prefer-rest-params`, `prefer-exponentiation-operator`, `no-useless-concat`, `no-useless-rename`, `no-useless-computed-key`, `dot-notation`.
- **Correção / bugs de design**: `no-await-in-loop`, `array-callback-return`, `require-atomic-updates`, `no-unmodified-loop-condition`, `no-constant-binary-expression`, `no-self-compare`, `no-unreachable-loop`, `no-promise-executor-return`, `no-template-curly-in-string`, `@typescript-eslint/no-shadow`.
- **Ordenação de imports** via `eslint-plugin-simple-import-sort`: `simple-import-sort/imports` + `simple-import-sort/exports`.
- **Config lockdown** (`scripts/validate-no-config-override.js`): rejeita configs de lint/format concorrentes no projeto (`.eslintrc*`, `.prettierrc*`, `.eslintignore`, chaves `prettier`/`eslintConfig` no `package.json`). Roda no `pre-commit`.
- **Install status guard** (`scripts/validate-install-status.js`): verifica que os hooks estão instalados e `core.hooksPath` aponta para `.hardlint/_`.
- **Barrel exports guard** (`scripts/validate-barrel-exports.js`): arquivos `index.*` só podem re-exportar (sem lógica). Roda no lint-staged.
- **Comando `verify`** (`npm run verify`): roda config lockdown + install status + eslint + barrel + testes (`npm test`, se existir).
- **Globals de browser/node/es2021** declarados no preset (via pacote `globals`), melhorando a análise de escopo (`window`, `fetch`, `FormData`, `URLSearchParams`, `setTimeout`, etc.).

- **Estende o `typescript-eslint/recommended`** (baseline da comunidade) via meta-pacote `typescript-eslint`, em vez de catar regras à mão. Traz o conjunto TS-específico padrão (`no-non-null-assertion`, `ban-ts-comment`, `no-unsafe-function-type`, `no-empty-object-type`, etc.) e acompanha a evolução do plugin.
- **Preset opcional type-checked** (`export { typeChecked }`): estende `recommendedTypeChecked` com `projectService` ligado, habilitando linting com informação de tipo (`no-floating-promises`, `no-misused-promises`, `await-thenable`, `only-throw-error`). Uso: `import { typeChecked } from 'hard-lint'`.
- **Camada de formatação `@stylistic`**: perfil opinativo via `stylistic.configs.customize` (2 espaços, aspas simples, ponto-e-vírgula, trailing comma `always-multiline`, `1tbs`) + `@stylistic/max-len` 100. Como o preset proíbe o Prettier (config lockdown), agora ele **provê** a formatação em vez de só bani-la.
- **`@typescript-eslint/consistent-type-imports`** (força `import type`, com `fixStyle: separate-type-imports`).
- **`import-x/no-duplicates`** (via `eslint-plugin-import-x`): proíbe imports duplicados do mesmo módulo.
- **Tiers `strict` e `strictTypeChecked`** (`export { strict, strictTypeChecked }`): estendem `tseslint.configs.strict` / `strictTypeChecked` para quem quer o máximo rigor. Ladder: `default` → `strict` → `typeChecked` → `strictTypeChecked`.
- `eqeqeq` (`always`, ignorando `== null`), `no-throw-literal` e `no-param-reassign` (`{ props: false }`) adicionados ao preset base.
- Globals aplicados também a `.cjs`/`.mjs` (arquivos de config CommonJS).

### Fixed

- `no-undef` desligado (o compilador TypeScript já cobre nomes indefinidos; evita falsos-positivos com o JSX automatic runtime — `React` — e tipos do lib DOM como `RequestInit`), seguindo a recomendação do typescript-eslint.
- `no-unused-vars` (base) desligado em favor de `@typescript-eslint/no-unused-vars`, evitando relatório duplicado.
- Regra custom `no-comments` migrada de `context.getSourceCode()` (depreciado no ESLint 9) para `context.sourceCode`.

### Changed

- O preset agora registra explicitamente os plugins `@typescript-eslint` e `simple-import-sort` (antes as regras `@typescript-eslint/*` eram referenciadas sem o plugin registrado).
- `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser` e `eslint-plugin-simple-import-sort` movidos para `dependencies` (são carregados em runtime pelo consumidor).
- `sort-imports` desativado em favor de `simple-import-sort`.
- O próprio repositório passou a fazer dogfooding do preset (`eslint.config.mjs` importa `./dist`); comentários/JSDoc removidos do `src` para respeitar a regra `no-comments`.

---

## [0.4.1] - 2026-02-13

### Fixed

- Hooks agora usam JavaScript wrappers para garantir exit codes corretos no Windows
- `pre-commit.js` agora executa lint-staged com propagação de status
- `commit-msg.js` agora recebe corretamente o arquivo de mensagem de commit
- Removidos shells scripts diretos em favor de Node.js wrappers mais portáveis

---

## [0.4.0] - 2026-02-13

### Added

- Script `install.js` para configuração automática de Husky e lint-staged
- Comando `node node_modules/hard-lint/scripts/install.js` para setup pré-commit
- Suporte a `.hardlint/` como diretório customizado de git hooks
- Configuração centralizada do commitlint em `hard-lint/commitlint.config.cjs`
- Husky e lint-staged movidos para `dependencies` (agora obrigatórios)
- Bin entry no package.json para CLI futura

### Changed

- Renomeado diretório de hooks de `.husky/` para `.hardlint/`
- Commitlint agora aponta para configuração centralizada do hard-lint
- Git `core.hooksPath` configurado automaticamente para `.hardlint`
- Pre-commit hook agora não precisa estar no repositório consumidor

---

## [0.3.0] - 2026-02-12

### Added

- PeerDependencies para commitlint
- Documentação explícita de pre-commit hooks
- Sincronização automática de versão entre git e npm

### Changed

- Atualizado hard-lint de 0.2.2 para 0.3.0
- README com seção melhorada sobre git hooks automáticos

---

## [0.1.0] - 2026-02-11

### Added

- Primeira versão de lançamento
- Configuração base com ESLint 9
- Regras TypeScript rigorosas
- Suporte a testes E2E
- Proibição de tipo `any`
- Proibição de console e comentários
