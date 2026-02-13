#!/usr/bin/env node
/**
 * Hard-Lint Install Script
 * Configures Husky and Commitlint for the project
 * Usage: node node_modules/hard-lint/scripts/install.js
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = process.cwd();
const hardlintRoot = path.join(__dirname, '..');
const hardLintDir = path.join(projectRoot, '.hardlint');

console.log('[INFO] Hard-Lint Installation');
console.log(`[INFO] Project root: ${projectRoot}\n`);

// 1. Check if is a Git repository
if (!fs.existsSync(path.join(projectRoot, '.git'))) {
  console.error('[ERROR] Not a Git repository. Initialize Git first with: git init');
  process.exit(1);
}

// 2. Check if package.json exists
if (!fs.existsSync(path.join(projectRoot, 'package.json'))) {
  console.error('[ERROR] package.json not found in project root');
  process.exit(1);
}

console.log('[OK] Git repository detected');
console.log('[OK] package.json found\n');

// 3. Create .hardlint directory
if (!fs.existsSync(hardLintDir)) {
  fs.mkdirSync(hardLintDir, { recursive: true });
  console.log('[OK] .hardlint directory created');
}

// 4. Create pre-commit hook
const preCommitContent = `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
`;

const preCommitPath = path.join(hardLintDir, 'pre-commit');
fs.writeFileSync(preCommitPath, preCommitContent);
fs.chmodSync(preCommitPath, '755');
console.log('[OK] pre-commit hook created');

// 5. Create commit-msg hook
const commitMsgContent = `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx commitlint --edit "$1" --config "${hardlintRoot}/commitlint.config.cjs"
`;

const commitMsgPath = path.join(hardLintDir, 'commit-msg');
fs.writeFileSync(commitMsgPath, commitMsgContent);
fs.chmodSync(commitMsgPath, '755');
console.log('[OK] commit-msg hook created\n');

// 6. Configure Git to use .hardlint directory
console.log('[...] Configuring Git hooks path...');
try {
  execSync(`git config core.hooksPath .hardlint`, { cwd: projectRoot, stdio: 'pipe' });
  console.log('[OK] Git configured to use .hardlint\n');
} catch (error) {
  console.error('[ERROR] Failed to configure Git:', error.message);
  process.exit(1);
}

// 7. Install Husky
console.log('[...] Installing Husky...');
try {
  const hardlintHuskyBin = path.join(hardlintRoot, 'node_modules', 'husky', 'bin.js');
  
  if (fs.existsSync(hardlintHuskyBin)) {
    execSync(`node ${hardlintHuskyBin} install`, { cwd: projectRoot, stdio: 'pipe' });
  } else {
    execSync('npx husky install', { cwd: projectRoot, stdio: 'pipe' });
  }
  console.log('[OK] Husky installed\n');
} catch (error) {
  console.error('[ERROR] Failed to install Husky:', error.message);
  process.exit(1);
}

// 8. Create lint-staged config in package.json if not exists
const packageJsonPath = path.join(projectRoot, 'package.json');
let packageJson = {};

try {
  const rawContent = fs.readFileSync(packageJsonPath, 'utf-8');
  packageJson = JSON.parse(rawContent);
} catch (error) {
  console.error('[ERROR] Failed to parse package.json:', error.message);
  process.exit(1);
}

if (!packageJson['lint-staged']) {
  packageJson['lint-staged'] = {
    '**/*.{ts,tsx,js,jsx}': ['eslint --fix', 'eslint'],
  };
  
  try {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log('[OK] lint-staged config added to package.json\n');
  } catch (error) {
    console.error('[ERROR] Failed to update package.json:', error.message);
    process.exit(1);
  }
} else {
  console.log('[OK] lint-staged config already exists in package.json\n');
}

console.log('[SUCCESS] Hard-Lint installation complete!');
console.log('[INFO] Git hooks are now active in .hardlint/');
console.log('[INFO] Pre-commit will validate code before commits');
console.log('[INFO] Commit messages must follow Conventional Commits format');
console.log('[INFO] Commitlint config: hard-lint/commitlint.config.cjs');
console.log('\n[NEXT] Make your first commit to test:\n  git add .\n  git commit -m "feat: your message"\n');
