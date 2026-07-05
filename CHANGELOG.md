# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto segue [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

---

## [0.5.0] - 2026-07-05

Portadas as regras equivalentes do `hard-lint-py` (Python) para o TypeScript.

### Added

- **Naming conventions** (`@typescript-eslint/naming-convention`), equivalente ao `N`/pep8-naming do ruff: PascalCase para tipos/interfaces, camelCase para variáveis/funções, UPPER_CASE para constantes, etc.
- **Modernização de sintaxe** (equivalente ao `UP`/pyupgrade): `prefer-template`, `object-shorthand`, `prefer-destructuring`, `prefer-spread`, `prefer-rest-params`, `prefer-exponentiation-operator`, `no-useless-concat`, `no-useless-rename`, `no-useless-computed-key`, `dot-notation`.
- **Correção / bugs de design** (equivalente ao `B`/flake8-bugbear): `no-await-in-loop`, `array-callback-return`, `require-atomic-updates`, `no-unmodified-loop-condition`, `no-constant-binary-expression`, `no-self-compare`, `no-unreachable-loop`, `no-promise-executor-return`, `no-template-curly-in-string`, `@typescript-eslint/no-shadow`.
- **Ordenação de imports** via `eslint-plugin-simple-import-sort` (equivalente ao `I`/isort): `simple-import-sort/imports` + `simple-import-sort/exports`.
- **Config lockdown** (`scripts/validate-no-config-override.js`), equivalente ao `check_lint_config_override`: rejeita configs de lint/format concorrentes no projeto (`.eslintrc*`, `.prettierrc*`, `.eslintignore`, chaves `prettier`/`eslintConfig` no `package.json`). Roda no `pre-commit`.
- **Install status guard** (`scripts/validate-install-status.js`), equivalente ao `check_install_status`: verifica que os hooks estão instalados e `core.hooksPath` aponta para `.hardlint/_`.
- **Barrel exports guard** (`scripts/validate-barrel-exports.js`), equivalente ao `empty-init`: arquivos `index.*` só podem re-exportar (sem lógica). Roda no lint-staged.
- **Comando `verify`** (`npm run verify`), equivalente ao `verify` do Python: roda config lockdown + install status + eslint + barrel + testes (`npm test`, se existir).

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
