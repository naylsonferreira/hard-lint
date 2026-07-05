# hard-lint

⚙️ Configuração **rigorosa** de ESLint para projetos TypeScript.

[![npm version](https://img.shields.io/npm/v/hard-lint.svg)](https://www.npmjs.com/package/hard-lint)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/naylsonferreira/hard-lint/actions/workflows/ci.yml/badge.svg)](https://github.com/naylsonferreira/hard-lint/actions/workflows/ci.yml)

## O que é?

`hard-lint` é uma biblioteca de configuração ESLint que implementa regras **rigorosas** para garantir:

- ✅ **Tipagem forte** - Proibição de `any`, tipos explícitos
- ✅ **Code quality** - Proibição de console, comentários
- ✅ **Acessibilidade** - Seletores semânticos em testes
- ✅ **Manutenibilidade** - Limites de complexidade, sintaxe consistente
- ✅ **Segurança** - Evita eval, scripts dinâmicos

> Inspirado no espírito rigoroso e zero-config de um linter irmão que criamos para Python.

## Instalação

```bash
yarn add --dev \
  hard-lint \
  eslint \
  typescript \
  @commitlint/cli \
  @commitlint/config-conventional
```

### Dependências Obrigatórias

| Pacote | Versão | Propósito |
|--------|--------|----------|
| `eslint` | >= 9.0.0 | Motor de linting |
| `typescript` | >= 5.0.0 | Suporte a TypeScript |
| `@commitlint/cli` | >= 20.0.0 | Validação de mensagens de commit |
| `@commitlint/config-conventional` | >= 20.0.0 | Config de Conventional Commits |

**Nota:** Todas as dependências acima são obrigatórias para o hard-lint funcionar corretamente (incluindo pre-commit e validação de commits).

## Requisitos

- **Node.js** >= 20.0.0
- **Yarn** >= 1.22.0
- **ESLint** >= 9.0.0 (peerDependency)
- **TypeScript** >= 5.0.0 (peerDependency)
- **@commitlint/cli** >= 20.0.0 (peerDependency, obrigatório para pre-commit)
- **@commitlint/config-conventional** >= 20.0.0 (peerDependency, obrigatório para pre-commit)

## O que Está Incluído

- ✅ **eslint.config.mjs** - Configuração ESLint 9 flat config
- ✅ **20+ regras rigorosas** - TypeScript, console, comentários, segurança
- ✅ **Pre-commit hooks** - Validação automática de código antes de commits (requer `@commitlint/*`)
- ✅ **Commit message validation** - Commitlint com Conventional Commits obrigatório
- ✅ **Tipos TypeScript** - Para customizações
- ✅ **Documentação completa** - README, guias de contribuição

## Uso Rápido

### ⚠️ Instalação Mínima (Apenas ESLint)

```bash
yarn add --dev hard-lint eslint typescript
```

Usa apenas validação de código ESLint manual.

### ✅ Instalação Completa (Com Pre-Commit + Commitlint)

```bash
yarn add --dev \
  hard-lint \
  eslint \
  typescript \
  @commitlint/cli \
  @commitlint/config-conventional
```

Ativa validação automática de código e commits nos git hooks.

**Recomendado:** Use a instalação completa para aproveitar o pre-commit automático.

### Em `eslint.config.mjs`:

```javascript
import hardlint from 'hard-lint';

export default [...hardlint];
```

O preset base estende o `typescript-eslint/recommended` (baseline da comunidade) e **não** exige informação de tipo — funciona zero-config.

### Modo type-checked (opcional, com informação de tipo)

Para habilitar as regras type-aware mais rigorosas (`no-floating-promises`, `no-misused-promises`, `await-thenable`, `only-throw-error`), use o preset `typeChecked`. Ele liga o `projectService`, então basta ter um `tsconfig.json` no projeto:

```javascript
import { typeChecked } from 'hard-lint';

export default [...typeChecked];
```

> Escolha **um** tier (todos incluem a mesma base de regras + formatação):
>
> | Export | Baseline typescript-eslint | Type info | Quando usar |
> |--------|----------------------------|-----------|-------------|
> | `default` (`import hardlint`) | `recommended` | ❌ | Padrão, zero-config |
> | `strict` | `strict` | ❌ | Mais rígido, ainda sem `tsconfig` |
> | `typeChecked` | `recommendedTypeChecked` | ✅ | Regras type-aware, exige `tsconfig` |
> | `strictTypeChecked` | `strictTypeChecked` | ✅ | Máximo rigor |
>
> ```javascript
> import { strict } from 'hard-lint';         // ou strictTypeChecked
> export default [...strict];
> ```

## Regras Implementadas

O preset base estende o **`typescript-eslint/recommended`** e adiciona as regras abaixo por cima.

### 📋 TypeScript

| Regra | Severidade | Config |
|-------|-----------|--------|
| `@typescript-eslint/no-explicit-any` | ❌ Error | Proíbe tipo `any` |
| `@typescript-eslint/no-unused-vars` | ❌ Error | Detecta variáveis não usadas (permite `_var`) |
| `@typescript-eslint/consistent-type-imports` | ❌ Error | Força `import type` para tipos |

### 🚫 Console & Comentários

| Regra | Severidade | Config |
|-------|-----------|--------|
| `no-console` | ❌ Error | Proíbe console.log, debug, warn, info |
| `no-inline-comments` | ❌ Error | Proíbe comentários na mesma linha |
| `no-warning-comments` | ❌ Error | Proíbe `todo`, `fixme`, `hack`, `xxx`, `note`, `debug`, `review` |

### 🎨 Code Style

| Regra | Severidade | Config |
|-------|-----------|--------|
| `no-var` | ❌ Error | Use `const`/`let` obrigatoriamente |
| `prefer-const` | ❌ Error | Use `const` sempre que possível |
| `prefer-arrow-callback` | ❌ Error | Prefira arrow functions em callbacks |
| `no-nested-ternary` | ❌ Error | Proíbe ternários aninhados |
| `eqeqeq` | ❌ Error | Exige `===`/`!==` (ignora `== null`) |
| `no-throw-literal` | ❌ Error | `throw` só de objetos `Error` |
| `no-param-reassign` | ❌ Error | Não reatribui parâmetros |
| `complexity` | ❌ Error | Máximo 10 de complexidade ciclomática |
| `max-depth` | ❌ Error | Máximo 3 níveis de aninhamento |
| `max-nested-callbacks` | ❌ Error | Máximo 3 callbacks aninhados |

### 🔤 Nomenclatura

| Regra | Severidade | Config |
|-------|-----------|--------|
| `@typescript-eslint/naming-convention` | ❌ Error | PascalCase para tipos/interfaces, camelCase para variáveis/funções, UPPER_CASE para constantes, PascalCase/UPPER_CASE para enums |

### ✨ Modernização de Sintaxe

| Regra | Severidade | Config |
|-------|-----------|--------|
| `prefer-template` | ❌ Error | Template literals em vez de concatenação |
| `object-shorthand` | ❌ Error | Shorthand de objetos |
| `prefer-destructuring` | ❌ Error | Desestruturação de objetos |
| `prefer-spread` / `prefer-rest-params` | ❌ Error | Spread/rest em vez de `apply`/`arguments` |
| `prefer-exponentiation-operator` | ❌ Error | `**` em vez de `Math.pow` |
| `no-useless-concat` / `no-useless-rename` / `no-useless-computed-key` | ❌ Error | Remove construções redundantes |
| `dot-notation` | ❌ Error | `obj.prop` em vez de `obj['prop']` |

### 🐛 Correção / Bugs de Design

| Regra | Severidade | Config |
|-------|-----------|--------|
| `no-await-in-loop` | ❌ Error | Evita `await` sequencial em loop |
| `array-callback-return` | ❌ Error | Callbacks de array devem retornar |
| `require-atomic-updates` | ❌ Error | Evita race em atribuição após `await` |
| `no-unmodified-loop-condition` | ❌ Error | Condição de loop nunca modificada |
| `no-constant-binary-expression` | ❌ Error | Expressão booleana constante |
| `no-self-compare` / `no-unreachable-loop` / `no-promise-executor-return` | ❌ Error | Bugs de lógica comuns |
| `no-template-curly-in-string` | ❌ Error | `${}` em string comum (esqueceu a template) |
| `@typescript-eslint/no-shadow` | ❌ Error | Proíbe shadowing de variáveis |

### 📦 Ordenação de Imports

| Regra | Severidade | Config |
|-------|-----------|--------|
| `simple-import-sort/imports` | ❌ Error | Ordena as declarações de import por grupos |
| `simple-import-sort/exports` | ❌ Error | Ordena os re-exports |
| `import-x/no-duplicates` | ❌ Error | Proíbe imports duplicados do mesmo módulo |

### 🎨 Formatação (`@stylistic`)

Como o Prettier é proibido pelo config lockdown, o hard-lint **provê** a formatação (perfil opinativo, tudo auto-fixável):

| Aspecto | Valor |
|---------|-------|
| Indentação | 2 espaços |
| Aspas | simples |
| Ponto-e-vírgula | obrigatório |
| Trailing comma | `always-multiline` |
| Brace style | `1tbs` |
| Comprimento de linha | 100 (`@stylistic/max-len`) |

Rode `eslint --fix` para formatar automaticamente.

### 🔒 Segurança

| Regra | Severidade | Config |
|-------|-----------|--------|
| `no-eval` | ❌ Error | Proíbe `eval()` |
| `no-implied-eval` | ❌ Error | Proíbe eval implícito (setTimeout com string) |
| `no-new-func` | ❌ Error | Proíbe `new Function()` |
| `no-script-url` | ❌ Error | Proíbe `javascript:` URLs |

### 🎭 Seletores Semânticos (E2E)

Validators customizados para garantir testes E2E que se comportam como usuários reais:

| Padrão | Mensagem |
|--------|----------|
| `.locator('button').nth()` | Use `getByRole('button')` para seletores semânticos |
| `.locator('button').filter()` | Use `getByRole('button', { name: /texto/i })` |
| `.locator('h1\|h2\|h3...')` | Use `getByRole('heading', { name: /texto/i })` |
| `.locator('button').first()` | Use `getByRole()` ou `getByLabel()` |

**Rodar manualmente:**
```bash
yarn validate-e2e [arquivos...]
```

**Automático no pre-commit:** Valida todos os `.e2e.ts` e `.test.ts` antes de commitar.

**Objetivo:** Testes que clicam em **palavras**, não em divs. Seletores que representam o que o usuário vê e interage.

### 🗂️ Validadores de Projeto

Além das regras de ESLint, o `hard-lint` aplica validações estruturais no nível do projeto:

| Validador | O que faz |
|-----------|-----------|
| **Config lockdown** | Rejeita config de lint/format concorrente (`.eslintrc*`, `.prettierrc*`, `.eslintignore`, chaves `prettier`/`eslintConfig` no `package.json`). O `hard-lint` gerencia toda a config. Roda no `pre-commit`. |
| **Install status** | Garante que os hooks estão instalados e `core.hooksPath` aponta para `.hardlint/_`. |
| **Barrel exports** | Arquivos `index.*` só podem re-exportar (sem lógica/declarações de valor). Roda no lint-staged. |

**Rodar manualmente:**
```bash
yarn validate-config-override
yarn validate-install
yarn validate-barrel [arquivos...]
```

### ✅ `verify` — portão completo

Roda tudo em sequência e falha no primeiro erro: config lockdown → install status → `eslint .` → barrel → `yarn test` (se houver script de teste).

```bash
yarn verify
```

## Exemplos

### ❌ PROIBIDO

```typescript
const data: any = fetch('/api');

console.log('Debug:', value);
console.debug('Debug info');
console.warn('warning');

const count = 0; // contador
```

### ✅ CORRETO

```typescript
const data: Promise<Response> = fetch('/api');

const count = 0;

const initializeUserCount = 0;
```

## Scripts

```bash
yarn build       # Build da biblioteca
yarn dev         # Watch mode
yarn lint        # Lint este projeto
yarn type-check  # Type check
yarn verify      # Portão completo: config + install + eslint + barrel + testes
```

## Git Hooks Automáticos (Pre-Commit + Commitlint)

O `hard-lint` **configura automaticamente** os git hooks para validação em dois momentos:

### 🎯 Pre-Commit Hook

**Executado** quando você roda `git commit` (antes da mensagem de commit)

**Valida:**
- ✅ ESLint - Codigo TypeScript (proíbe `any`, `console`, comentários, etc)
- ✅ E2E Selectors - Testes Playwright com seletores semânticos
- ✅ JSDoc - Valida ausência de comentários

**Comportamento:**
```bash
$ git add .
$ git commit -m "feat: nova feature"
# ↓ Hard-Lint executa automaticamente:
# [1/2] eslint . --fix       ✅ ou ❌
# [2/2] validate-e2e         ✅ ou ❌
```

**Se houver erro:**
- ❌ Commit é bloqueado
- 📋 Erro é exibido com detalhes
- 🔧 Corrija o código e tente novamente

**Exemplo de erro:**
```
❌ ESLint Error
  src/utils/api.ts:15:5 - no-console
    Unexpected console statement

Fix the issues and commit again.
```

### 📝 Commit-Msg Hook

**Executado** quando você tenta fazer commit (valida a mensagem)

**Valida:**
- ✅ Tipo obrigatório (`feat`, `fix`, `docs`, etc)
- ✅ Escopo recomendado (ex: `feat(auth)`)
- ✅ Descrição máx 100 caracteres
- ✅ Sem ponto final na descrição

**Formatos válidos:**
```bash
feat: add user authentication          # ✅ Simples
feat(auth): add user authentication    # ✅ Com escopo
fix(api): resolve token expiration     # ✅ Bug fix
docs: update README                    # ✅ Documentação
```

**Formatos inválidos:**
```bash
blablabla                              # ❌ Sem tipo
feat adicionar feature                 # ❌ Sem dois-pontos
feat: add new feature.                 # ❌ Ponto final
feat(): add feature                    # ❌ Escopo vazio
```

### Como Funciona

1. **Primeira vez** que instala hard-lint:
   ```bash
   yarn add --dev hard-lint @commitlint/cli @commitlint/config-conventional
   yarn build  # se hard-lint for desenvolvido localmente
   ```

2. **Hooks são criados automaticamente** em `.git/hooks/`

3. **Próximos commits** executam validação automática

### Desabilitar Temporariamente

Para bypassar hooks em emergência:
```bash
git commit --no-verify -m "seu mensagem aqui"
```

⚠️ **Não use em produção!**

### Dependências Necessárias

Para o pre-commit e commitlint funcionarem:

```bash
yarn add --dev \
  @commitlint/cli \
  @commitlint/config-conventional
```

Se remover estas dependências, os hooks falharão com `Command not found`.

### Configuração de Commitlint

Se o proyecto tiver um arquivo `.commitlintrc.json`, use:

```json
{
  "extends": ["@commitlint/config-conventional"]
}
```

## Configuração Avançada

Para customizar ou estender a config:

```javascript
import hardlint from 'hard-lint';

export default [
  ...hardlint,
  {
    files: ['src/**/*.ts'],
    rules: {
      'no-console': 'warn'
    }
  }
];
```

## Contribuindo

1. Fork o repositório (https://github.com/naylsonferreira/hard-lint)
2. Crie uma branch (`git checkout -b feature/improvement`)
3. Commit suas mudanças (`git commit -m 'Add: melhoria'`)
4. Push para a branch (`git push origin feature/improvement`)
5. Abra um Pull Request

## Publicação no NPM

1. Faça login no registry: `npm login`
2. Rode o release (bump + build + publish + tag): `yarn release:patch` (ou `:minor` / `:major`)
3. Envie a tag: `git push origin main --tags`

> Publicamos no NPM Registry, mas o gerenciador de pacotes do projeto é o **Yarn** (build/scripts/CI). `npm login` é usado só para autenticar no registry.

## Licença

MIT © 2026 naylsonferreira
