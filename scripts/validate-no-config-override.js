#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const FORBIDDEN_FILES = [
  '.eslintrc',
  '.eslintrc.js',
  '.eslintrc.cjs',
  '.eslintrc.mjs',
  '.eslintrc.json',
  '.eslintrc.yml',
  '.eslintrc.yaml',
  '.eslintignore',
  '.prettierrc',
  '.prettierrc.js',
  '.prettierrc.cjs',
  '.prettierrc.mjs',
  '.prettierrc.json',
  '.prettierrc.yml',
  '.prettierrc.yaml',
  '.prettierrc.toml',
  'prettier.config.js',
  'prettier.config.cjs',
  'prettier.config.mjs'
];

const FORBIDDEN_PACKAGE_KEYS = ['prettier', 'eslintConfig'];

function isHardLintRepo(projectRoot) {
  const pkgPath = path.join(projectRoot, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    return false;
  }
  try {
    return JSON.parse(fs.readFileSync(pkgPath, 'utf8')).name === 'hard-lint';
  } catch {
    return false;
  }
}

function main() {
  const projectRoot = process.cwd();

  if (isHardLintRepo(projectRoot)) {
    process.exit(0);
  }

  const foundFiles = FORBIDDEN_FILES.filter((file) =>
    fs.existsSync(path.join(projectRoot, file))
  );

  const foundKeys = [];
  const pkgPath = path.join(projectRoot, 'package.json');
  if (fs.existsSync(pkgPath)) {
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      for (const key of FORBIDDEN_PACKAGE_KEYS) {
        if (pkg[key] !== undefined) {
          foundKeys.push(key);
        }
      }
    } catch {
      process.exit(0);
    }
  }

  if (foundFiles.length === 0 && foundKeys.length === 0) {
    process.exit(0);
  }

  if (foundFiles.length > 0) {
    console.error(
      `ERROR: Project has custom lint/format configuration files: ${foundFiles.join(', ')}`
    );
    console.error('hard-lint manages all lint configuration. Remove these files.');
  }

  if (foundKeys.length > 0) {
    console.error(
      `ERROR: package.json has custom lint/format keys: ${foundKeys.join(', ')}`
    );
    console.error('hard-lint manages all lint configuration. Remove these keys from package.json.');
  }

  process.exit(1);
}

main();
