# Guia de Publicação no NPM

Este documento descreve como publicar o `hard-lint` no NPM Registry.

## Pré-requisitos

- Conta NPM criada em https://www.npmjs.com
- Node.js e npm instalados
- Autenticação configurada no npm

## Passos para Publicação

### Forma Rápida (Recomendado)

Use um dos scripts de release que sincronizam automaticamente `package.json`, git tag e npm:

```bash
# Para patch release (0.3.0 -> 0.3.1)
npm run release:patch

# Para minor release (0.3.0 -> 0.4.0)
npm run release:minor

# Para major release (0.3.0 -> 1.0.0)
npm run release:major
```

**O que acontece automaticamente:**
1. ✅ `npm version <type>` - Atualiza `package.json` e cria git tag
2. ✅ `npm run build` - Compila TypeScript
3. ✅ `npm publish` - Publica no npm
4. ✅ Git commit + tag são enviados para origin (você precisa fazer `git push origin main --tags`)

### Forma Manual (Detalhada)

```bash
npm login
```

Será solicitado:
- Username (seu usuário NPM)
- Password
- Email

Após autenticação bem-sucedida, um token será salvo.

### 2. Incrementar Versão

Atualize a versão em `package.json` seguindo [Semantic Versioning](https://semver.org/):

```bash
# Para patch (0.1.0 -> 0.1.1)
npm version patch

# Para minor (0.1.0 -> 0.2.0)
npm version minor

# Para major (0.1.0 -> 1.0.0)
npm version major
```

Isso atualiza automaticamente `package.json` e cria um git tag.

### 3. Atualizar CHANGELOG

Adicione uma nova seção no `CHANGELOG.md` com as mudanças na versão.

### 4. Build

```bash
npm run build
```

Verifique os arquivos em `dist/`:

```bash
ls -la dist/
```

### 5. Publicar

Para publicar com acesso público (recomendado):

```bash
npm publish --access public
```

Para publicar em um registry customizado:

```bash
npm publish --registry https://registry.npmjs.org/
```

### 6. Verificar Publicação

Acesse: https://www.npmjs.com/package/hard-lint

Ou use a linha de comando:

```bash
npm view hard-lint
```

## Integração com GitHub Actions

O projeto está configurado com GitHub Actions para publicação automática ao fazer push na branch `main`.

**Requisitos:**
1. Adicionar `NPM_TOKEN` como secret no GitHub (Settings → Secrets → New repository secret)
2. Fazer push para `main` (não funciona em PRs)

## Troubleshooting

### Erro: "Permission denied"
- Verifique se está logado: `npm whoami`
- Verifique permissões da organização em npmjs.com

### Erro: "Package name too long"
- Nomes simples sem escopo (ex: `hard-lint`)
- Total não pode exceder 214 caracteres

### Erro: "Version already published"
- Incrementar versão em `package.json`
- Não reusar versões já publicadas

### Erro: "Token expired"
- Fazer logout e login novamente: `npm logout && npm login`
- Ou gerar novo token em https://www.npmjs.com/settings/tokens

## Rollback

Se publicar versão errada:

```bash
# Despublish a versão
npm unpublish hard-lint@versão

# Usar apenas em casos de erro crítico
# Redelploy a versão correta após correção
```

## Versionamento Semântico

- **MAJOR** (1.0.0): Mudanças incompatíveis
- **MINOR** (0.1.0): Novas features compatíveis
- **PATCH** (0.0.1): Bug fixes

Exemplos:
- Nova regra ESLint = Minor
- Atualizar versão de dependency = Minor
- Corrigir configuração = Patch
- Remover regra = Major

## Instalação em Projetos

Após publicação, usuários instalam com:

```bash
npm install --save-dev hard-lint eslint typescript
```

---

**Dúvidas ou problemas?** Abra uma issue no GitHub.
