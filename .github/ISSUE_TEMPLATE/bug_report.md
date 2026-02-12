name: Bug Report
description: Reportar um bug encontrado
title: "[BUG] "
labels: ["bug"]
assignees: []

body:
  - type: markdown
    attributes:
      value: |
        Obrigado por reportar um bug! Preencha as informações abaixo.

  - type: checkboxes
    attributes:
      label: Verificou se o bug já foi reportado?
      description: Por favor, verifique na seção de Issues se há um bug similar.
      options:
        - label: Sim, verifiquei
          required: true

  - type: textarea
    attributes:
      label: Descrição do Bug
      description: Descreva o bug com clareza
      placeholder: O que aconteceu de errado?
    validations:
      required: true

  - type: textarea
    attributes:
      label: Comportamento Esperado
      description: O que deveria ter acontecido?
      placeholder: Descreva o comportamento correto...
    validations:
      required: true

  - type: textarea
    attributes:
      label: Passos para Reproduzir
      description: Como reproduzir o bug?
      placeholder: |
        1. ...
        2. ...
        3. ...
    validations:
      required: true

  - type: textarea
    attributes:
      label: Código de Exemplo
      description: Se aplicável, forneça um exemplo minimalista
      render: typescript

  - type: textarea
    attributes:
      label: Ambiente
      description: Ambiente onde o bug ocorre
      value: |
        - Node.js version: 
        - npm version: 
        - OS: 
        - hard-lint version: 
    validations:
      required: true

  - type: textarea
    attributes:
      label: Informações Adicionais
      description: Qualquer outra informação relevante
