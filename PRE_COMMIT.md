# Pre-Commit Hooks

Este projeto usa **Husky** + **lint-staged** + **commitlint** para validar código antes de commits.

## Como Funciona

### 1. Pre-Commit Hook (`.husky/pre-commit`)

Executado **automaticamente** antes de cada `git commit`:

```bash
git add .
git commit -m "feat: adiciona nova feature"
# ↓ executa automaticamente
# npx lint-staged
# ↓ roda eslint nos arquivos staged
```

**Valida:**
- ✅ Proíbe comentários no código
- ✅ Proíbe console.log
- ✅ Força tipagem TypeScript
- ✅ E todas as outras regras hard-lint

**Se houver erro:**
- ❌ Commit é bloqueado
- 📋 Mensagem de erro é exibida
- 🔧 Você precisa corrigir antes de committar

### 2. Commit-Msg Hook (`.husky/commit-msg`)

Valida a **mensagem do commit**:

```bash
git commit -m "invalid message"
# ✅ CORRETO: git commit -m "feat: descrição"
# ✅ CORRETO: git commit -m "fix: correção"
# ❌ ERRADO: git commit -m "blablabla"
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
- `revert` - Revert de commit
- `ci` - CI/CD

## Configuração

### Instalação

```bash
yarn install
```

O Husky é instalado automaticamente no `yarn install` (via `prepare` script).

### Teste Manual

Para testar os hooks sem fazer commit:

```bash
npx lint-staged
npx commitlint --edit "<mensagem>"
```

### Desabilitar Temporariamente

Se realmente precisar fazer bypass (não recomendado):

```bash
git commit --no-verify
```

## Formatação de Commits

Padrão **Conventional Commits**:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Regras obrigatórias:**
- **Header (primeira linha)**: Máx 100 caracteres
- **Body (corpo)**: Máx 100 caracteres por linha
- **Type**: deve ser um dos tipos permitidos
- **Subject**: minúsculas

### Exemplos

```bash
git commit -m "feat: add new rule for comments"
git commit -m "fix: resolve eslint config issue"
git commit -m "docs: update README"
git commit -m "refactor: simplify config structure"
```

❌ Muito longo (>100 chars):
```bash
git commit -m "feat: add a new rule that validates comments in the entire codebase with strict enforcement"
```

## Troubleshooting

### "Husky not working"

```bash
npx husky install
```

### "lint-staged não executa"

Verifique se há arquivos staged:

```bash
git status
git add <arquivos>
git commit
```

### "commitlint rejeitou mensagem"

Verifique o formato:

```bash
git commit -m "type: descriptions"
```

Use um dos tipos permitidos acima.

## Documentação Oficial

- [Husky](https://typicode.github.io/husky/)
- [lint-staged](https://github.com/okonet/lint-staged)
- [Commitlint](https://commitlint.js.org/)
- [Conventional Commits](https://www.conventionalcommits.org/)
