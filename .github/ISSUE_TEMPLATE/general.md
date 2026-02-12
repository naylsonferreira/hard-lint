name: General Issue
description: Reportar um problema geral
title: "[ISSUE] "
labels: []
assignees: []

body:
  - type: markdown
    attributes:
      value: |
        Descreva o problema aqui.

  - type: textarea
    attributes:
      label: Descrição
      description: Forneça detalhes sobre o problema
      placeholder: Descreva o problema...
    validations:
      required: true

  - type: textarea
    attributes:
      label: Contexto Adicional
      description: Qualquer informação que ajude a entender melhor
