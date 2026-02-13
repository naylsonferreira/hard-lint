# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto segue [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added

- Scripts de release automático (npm run release:*)
- GitHub Actions workflow para publicação automática no npm
- PeerDependencies para commitlint no hard-lint

### Changed

- Atualizado README com documentação completa de pre-commit e commitlint
- Removido husky do blacksmith-admin (hard-lint gerencia os hooks nativamente)

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
