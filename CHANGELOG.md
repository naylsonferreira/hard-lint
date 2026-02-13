# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto segue [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added

### Changed

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
