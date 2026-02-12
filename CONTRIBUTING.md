# Contribuindo para hard-lint

Obrigado por considerar contribuir para o hard-lint! Este documento fornece diretrizes e instruções para contribuir.

## Código de Conduta

Este projeto adota um Código de Conduta. Esperamos que todos os contribuidores respeitem-o.

## Como Contribuir

### Reportando Bugs

Antes de criar um relatório de bug, verifique a lista de problemas, pois talvez o problema já tenha sido relatado.

**Para um bom relatório de bug, inclua:**

- Um título claro e descritivo
- Descrição exata do comportamento observado
- Descrição do comportamento esperado
- Exemplos específicos para demonstrar o problema
- Seu ambiente (versão do Node, npm, SO, etc)

### Sugerindo Melhorias

Sugestões de melhorias são bem-vindas! Ao criar uma solicitação de melhoria:

- Use um título claro e descritivo
- Inclua uma descrição da melhoria
- Liste exemplos de como a melhoria seria usada
- Explique por que essa melhoria seria útil

### Pull Requests

- Preencha o modelo de pull request fornecido
- Siga os guias de estilo do projeto
- Inclua screenshots ou GIFs quando apropriado
- Termine todos os arquivos com uma nova linha

## Guias de Estilo

### Commits

- Use o tempo imperativo ("Adiciona feature" não "Adicionado feature")
- Limite a primeira linha a 72 caracteres ou menos
- Referencie problemas e pull requests liberalmente após a primeira linha

### Código TypeScript

- Use `const` como padrão
- Sempre adicione type annotations explícitas
- Adicione comentários JSDoc para funções públicas
- Mantenha a complexidade baixa

### Nomes de Branch

- Use nomes descritivos: `feature/nome-feature`, `fix/nome-bug`, `docs/atualização`

## Processo de Desenvolvimento

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/minha-feature`)
3. Faça suas mudanças
4. Execute os testes (`npm run lint` e `npm run type-check`)
5. Commit suas mudanças (`git commit -m 'Add: descrição'`)
6. Push para a branch (`git push origin feature/minha-feature`)
7. Abra um Pull Request

## Dúvidas?

Sinta-se à vontade para abrir uma issue ou entrar em contato com os mantenedores.

---

Obrigado por contribuir! 🎉
