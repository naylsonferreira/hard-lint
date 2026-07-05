#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { parse } from '@typescript-eslint/parser';

const IGNORED_DIRS = new Set([
  'node_modules',
  'dist',
  'build',
  '.next',
  'coverage',
  '.git',
  '.hardlint'
]);

const BARREL_NAMES = new Set(['index.ts', 'index.tsx', 'index.js', 'index.jsx']);

function isAllowedStatement(node) {
  switch (node.type) {
    case 'ImportDeclaration':
      return true;
    case 'ExportAllDeclaration':
      return true;
    case 'ExportNamedDeclaration':
      if (!node.declaration) {
        return true;
      }
      return (
        node.declaration.type === 'TSTypeAliasDeclaration' ||
        node.declaration.type === 'TSInterfaceDeclaration'
      );
    case 'TSTypeAliasDeclaration':
    case 'TSInterfaceDeclaration':
      return true;
    default:
      return false;
  }
}

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let ast;
  try {
    ast = parse(content, {
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
      loc: true
    });
  } catch {
    return [];
  }

  const violations = [];
  for (const node of ast.body) {
    if (!isAllowedStatement(node)) {
      violations.push({
        file: filePath,
        line: node.loc ? node.loc.start.line : 1,
        kind: node.type
      });
    }
  }
  return violations;
}

function walkDir(dir, callback) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name) && !entry.name.startsWith('.')) {
        walkDir(full, callback);
      }
    } else if (BARREL_NAMES.has(entry.name)) {
      callback(full);
    }
  }
}

function collectTargets(args) {
  const targets = args.length > 0 ? args : [process.cwd()];
  const files = [];
  for (const target of targets) {
    if (!fs.existsSync(target)) {
      continue;
    }
    const stat = fs.statSync(target);
    if (stat.isDirectory()) {
      walkDir(target, (file) => files.push(file));
    } else if (BARREL_NAMES.has(path.basename(target))) {
      files.push(target);
    }
  }
  return files;
}

function main() {
  const files = collectTargets(process.argv.slice(2));
  const allViolations = [];
  for (const file of files) {
    allViolations.push(...validateFile(file));
  }

  if (allViolations.length === 0) {
    process.exit(0);
  }

  console.error(
    `\n✖ Barrel files (index.*) must only re-export. Found ${allViolations.length} violation(s):\n`
  );
  for (const violation of allViolations) {
    console.error(`${violation.file}:${violation.line}: ${violation.kind} is not allowed in a barrel file`);
  }
  console.error('\nBarrel files may only contain import and export/re-export statements (types allowed).');
  process.exit(1);
}

main();
