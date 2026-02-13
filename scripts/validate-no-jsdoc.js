#!/usr/bin/env node

/**
 * Script para detectar comentários JSDoc e blocos de comentários
 * Execução: node scripts/validate-no-jsdoc.js [diretório]
 */

const fs = require('fs');
const path = require('path');

const PATTERNS = {
  jsdoc: /\/\*\*[\s\S]*?\*\//g,
  blockComment: /\/\*[\s\S]*?\*\//g,
};

function getLineNumber(content, index) {
  return content.substring(0, index).split('\n').length;
}

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const errors = [];

  // Encontrar JSDoc comments (/** */)
  let match;
  const jsdocRegex = /\/\*\*[\s\S]*?\*\//g;
  while ((match = jsdocRegex.exec(content)) !== null) {
    const lineNumber = getLineNumber(content, match.index);
    const comment = match[0].split('\n')[0].substring(0, 60) + '...';
    errors.push({
      file: filePath,
      line: lineNumber,
      type: 'JSDoc',
      comment: comment,
    });
  }

  return errors;
}

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Ignorar node_modules, dist, .next, etc
      if (
        !file.startsWith('.') &&
        !['node_modules', 'dist', 'build', 'coverage'].includes(file)
      ) {
        walkDir(filePath, callback);
      }
    } else if (
      file.endsWith('.ts') ||
      file.endsWith('.tsx') ||
      file.endsWith('.js') ||
      file.endsWith('.jsx')
    ) {
      callback(filePath);
    }
  });
}

function main() {
  const targetDir = process.argv[2] || process.cwd();
  const allErrors = [];

  walkDir(targetDir, (filePath) => {
    const errors = validateFile(filePath);
    allErrors.push(...errors);
  });

  if (allErrors.length === 0) {
    console.log('✓ Nenhum comentário JSDoc encontrado!');
    process.exit(0);
  }

  console.error(`\n✖ ${allErrors.length} comentário(s) JSDoc encontrado(s):\n`);

  allErrors.forEach((error) => {
    console.error(`${error.file}:${error.line}`);
    console.error(`  ${error.type}: ${error.comment}`);
  });

  process.exit(1);
}

main();
