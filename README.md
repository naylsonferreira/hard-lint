# hard-lint

⚙️ Configuração **rigorosa** de ESLint para projetos TypeScript e Next.js.

[![npm version](https://img.shields.io/npm/v/hard-lint.svg)](https://www.npmjs.com/package/hard-lint)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## O que é?

`hard-lint` é uma biblioteca de configuração ESLint que implementa regras **rigorosas** para garantir:

- ✅ **Tipagem forte** - Proibição de `any`, tipos explícitos
- ✅ **Code quality** - Proibição de console, comentários
- ✅ **Acessibilidade** - Seletores semânticos em testes
- ✅ **Manutenibilidade** - Limites de complexidade, sintaxe consistente
- ✅ **Segurança** - Evita eval, scripts dinâmicos

## Instalação

```bash
npm install --save-dev hard-lint eslint typescript
```

## Requisitos

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0
- **ESLint** >= 9.0.0
- **TypeScript** >= 5.0.0

## O que Está Incluído

- ✅ **eslint.config.mjs** - Configuração ESLint 9 flat config
- ✅ **20+ regras rigorosas** - TypeScript, console, comentários, segurança
- ✅ **Pre-commit hooks** - Husky + lint-staged para validação automática
- ✅ **Commit validation** - Commitlint com Conventional Commits
- ✅ **Tipos TypeScript** - Para customizações
- ✅ **Documentação completa** - README, guias de contribuição

## Uso Rápido

### Em `eslint.config.mjs`:

```javascript
import hardlint from 'hard-lint';

export default [...hardlint];
```

## Regras Implementadas

### 📋 TypeScript

| Regra | Severidade | Config |
|-------|-----------|--------|
| `@typescript-eslint/no-explicit-any` | ❌ Error | Proíbe tipo `any` |
| `@typescript-eslint/no-unused-vars` | ❌ Error | Detecta variáveis não usadas (permite `_var`) |

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
| `sort-imports` | ❌ Error | Imports devem estar ordenados |
| `complexity` | ❌ Error | Máximo 10 de complexidade ciclomática |
| `max-depth` | ❌ Error | Máximo 3 níveis de aninhamento |
| `max-nested-callbacks` | ❌ Error | Máximo 3 callbacks aninhados |

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
npm run validate-e2e [arquivos...]
```

**Automático no pre-commit:** Valida todos os `.e2e.ts` e `.test.ts` antes de commitar.

**Objetivo:** Testes que clicam em **palavras**, não em divs. Seletores que representam o que o usuário vê e interage.

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
npm run build       # Build da biblioteca
npm run dev         # Watch mode
npm run lint        # Lint este projeto
npm run type-check  # Type check
```

## Git Hooks (Husky + Commitlint)

Este projeto usa **Husky** + **lint-staged** + **commitlint** para validar código e commits:

### Pre-Commit Hook

Executado **automaticamente** antes de cada commit:

```bash
git add .
git commit -m "feat: adiciona nova feature"
# ↓ Valida automaticamente
# - Roda ESLint (proíbe comentários, console, etc)
# - Detecta e bloqueia violations
```

**Se houver erro:**
- ❌ Commit é bloqueado
- 📋 Erro é exibido
- 🔧 Corrija o código antes de committar

### Commit-Msg Hook

Valida o **formato da mensagem**:

```bash
# ✅ Formato correto (max 100 chars)
git commit -m "feat: add new validation rule"

# ❌ Formato inválido
git commit -m "blablabla"
```

**Tipos permitidos:**
- `feat` - Nova feature
- `fix` - Bug fix
- `docs` - Documentação
- `style` - Formatação
- `refactor` - Refatoração
- `perf` - Performance
- `test` - Testes
- `chore` - Manutenção
- `revert` - Revert
- `ci` - CI/CD

Veja [PRE_COMMIT.md](./PRE_COMMIT.md) para documentação completa.

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

1. Fork o repositório (https://github.com/naylsonfsa/hard-lint)
2. Crie uma branch (`git checkout -b feature/improvement`)
3. Commit suas mudanças (`git commit -m 'Add: melhoria'`)
4. Push para a branch (`git push origin feature/improvement`)
5. Abra um Pull Request

## Publicação no NPM

1. Faça login: `npm login`
2. Incremente versão: `npm version patch|minor|major`
3. Build: `npm run build`
4. Publique: `npm publish --access public`

## Licença

MIT © 2026 naylsonfsa
