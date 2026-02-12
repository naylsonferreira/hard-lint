#!/usr/bin/env node

/**
 * Validador de Seletores Semânticos para Testes E2E
 *
 * Garante que testes E2E usem padrões semânticos e não classes/IDs de teste arbitrários.
 * Faz testes parecerem com interações reais de usuários: clicando em botões, preenchendo formulários,
 * selecionando por texto/label, em vez de seletores CSS aleatórios.
 *
 * Uso: node scripts/validate-e2e-selectors.js [arquivos...]
 */

const fs = require('fs');
const path = require('path');

const rules = [
  {
    pattern: /\.locator\s*\(\s*['"`](button|input|select|textarea)['""`]\s*\)\.nth\s*\(/,
    message: "EVITE .locator('button').nth() - Use getByRole('button') ou getByLabel() para seletores semânticos. Se realmente necessário, adicione comentário explicando por quê.",
  },
  {
    pattern: /\.locator\s*\(\s*['"`](button|input|select|textarea)['""`]\s*\)\.filter\s*\(/,
    message: "EVITE .locator('button').filter() - Use getByRole('button', { name: /texto/i }) para seletores semânticos.",
  },
  {
    pattern: /\.locator\s*\(\s*['"`](h[1-6])['""`]\s*\)/,
    message: "EVITE .locator('h1|h2|h3|h4|h5|h6') - Use getByRole('heading', { name: /texto/i }) para seletores semânticos.",
  },
  {
    pattern: /\.locator\s*\(\s*['"`]h[1-6]\s*,\s*h[1-6][\s\w,]*['""`]\s*\)/,
    message: "EVITE .locator('h1, h2, h3') - Use getByRole('heading', { name: /texto/i }) para seletores semânticos.",
  },
  {
    pattern: /\.locator\s*\(\s*['"`](button|input|select|textarea)['""`]\s*\)\.first\s*\(/,
    message: "EVITE .locator('button').first() - Use getByRole('button', { name: /texto/i }) ou getByLabel() para seletores semânticos.",
  },
];

function validateFile(filePath) {
  const ext = path.extname(filePath);
  if (!['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
    return [];
  }

  // Ignorar arquivo do próprio validador
  if (filePath.includes('validate-e2e-selectors')) {
    return [];
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const violations = [];

  lines.forEach((line, index) => {
    // Ignorar comentários
    const codeOnly = line.replace(/\/\/.*$/, '').replace(/\/\*.*\*\//g, '');

    rules.forEach((rule) => {
      if (rule.pattern.test(codeOnly)) {
        violations.push({
          file: filePath,
          line: index + 1,
          message: rule.message,
        });
      }
    });
  });

  return violations;
}

function main() {
  const args = process.argv.slice(2);
  const files = args.length > 0 ? args : ['.'];

  let allViolations = [];

  files.forEach((file) => {
    const stats = fs.statSync(file);

    if (stats.isDirectory()) {
      const walkDir = (dir) => {
        fs.readdirSync(dir).forEach((name) => {
          const filePath = path.join(dir, name);
          const fileStats = fs.statSync(filePath);

          if (fileStats.isDirectory() && !['node_modules', 'dist', '.git'].includes(name)) {
            walkDir(filePath);
          } else if (fileStats.isFile()) {
            allViolations = allViolations.concat(validateFile(filePath));
          }
        });
      };
      walkDir(file);
    } else {
      allViolations = allViolations.concat(validateFile(file));
    }
  });

  if (allViolations.length > 0) {
    console.error('\n❌ Violações de Seletores Semânticos Encontradas:\n');
    allViolations.forEach((v) => {
      console.error(`  ${v.file}:${v.line}`);
      console.error(`  ${v.message}\n`);
    });
    process.exit(1);
  }

  console.log('✅ Nenhuma violação de seletores semânticos encontrada.');
  process.exit(0);
}

main();
