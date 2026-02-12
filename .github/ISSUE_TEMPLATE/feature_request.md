name: Feature Request
description: Sugerir uma nova feature
title: "[FEATURE] "
labels: ["enhancement"]
assignees: []

body:
  - type: markdown
    attributes:
      value: |
        Obrigado pela sugestão! Descreva sua ideia abaixo.

  - type: checkboxes
    attributes:
      label: É uma melhoria relacionada a um problema?
      description: Há um problema não resolvido?
      options:
        - label: Sim
          required: false

  - type: textarea
    attributes:
      label: Descrição da Feature
      description: Descreva a nova feature desejada
      placeholder: O que gostaria de adicionar?
    validations:
      required: true

  - type: textarea
    attributes:
      label: Caso de Uso
      description: Por que essa feature seria útil?
      placeholder: Qual problema ela resolveria?
    validations:
      required: true

  - type: textarea
    attributes:
      label: Exemplos de Implementação
      description: Como deveria funcionar?
      render: typescript

  - type: textarea
    attributes:
      label: Alternativas Consideradas
      description: Há outras formas de fazer isso?
