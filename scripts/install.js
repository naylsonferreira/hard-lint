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

// 3. Setup Husky infrastructure in .hardlint/_ directory
console.log('[...] Setting up Husky in .hardlint...');
try {
  // Create .hardlint/_ directory for Husky hooks and support files
  const hardlintHooksDir = path.join(projectRoot, '.hardlint', '_');
  fs.mkdirSync(hardlintHooksDir, { recursive: true });
  
  // Create .hardlint/.gitignore (ignores everything in _/ directory)
  fs.writeFileSync(path.join(projectRoot, '.hardlint', '.gitignore'), '*');
  
  // Copy Husky's core helper file
  const huskyHelperSrc = path.join(hardlintRoot, 'node_modules', 'husky', 'husky');
  const huskyHelperDest = path.join(hardlintHooksDir, 'h');
  
  if (fs.existsSync(huskyHelperSrc)) {
    fs.copyFileSync(huskyHelperSrc, huskyHelperDest);
    fs.chmodSync(huskyHelperDest, '755');
  } else {
    // Minimal fallback if husky file doesn't exist
    const fallbackHusky = `#!/bin/sh\n. "$(dirname "$0")/../../node_modules/husky/husky"\n`;
    fs.writeFileSync(huskyHelperDest, fallbackHusky, { mode: 0o755 });
  }
  
  // Configure Git to use .hardlint/_ as hooks path
  execSync('git config core.hooksPath .hardlint/_', { cwd: projectRoot, stdio: 'pipe' });
  
  console.log('[OK] Husky infrastructure configured\n');
} catch (error) {
  console.error('[ERROR] Failed to setup Husky:', error.message);
  console.error(error.stack);
  process.exit(1);
}

// 4. Ensure .hardlint directory exists
if (!fs.existsSync(hardLintDir)) {
  fs.mkdirSync(hardLintDir, { recursive: true });
}

// 5. Create pre-commit hook as shell wrapper to Node.js
// NOTE: Hooks are created in .hardlint/_ (the hooks path)
const hooksDir = path.join(hardLintDir, '_');
const preCommitJsPath = path.join(hardlintRoot, 'scripts', 'hooks', 'pre-commit.js');
const preCommitContent = `#!/bin/sh\nnode "${preCommitJsPath}"\n`;

const preCommitPath = path.join(hooksDir, 'pre-commit');
fs.writeFileSync(preCommitPath, preCommitContent, { encoding: 'utf8' });
fs.chmodSync(preCommitPath, 0o755);
console.log('[OK] pre-commit hook created');

// 6. Create commit-msg hook as shell wrapper to Node.js
const commitMsgJsPath = path.join(hardlintRoot, 'scripts', 'hooks', 'commit-msg.js');
const commitMsgContent = `#!/bin/sh\nnode "${commitMsgJsPath}" "$@"\n`;

const commitMsgPath = path.join(hooksDir, 'commit-msg');
fs.writeFileSync(commitMsgPath, commitMsgContent, { encoding: 'utf8' });
fs.chmodSync(commitMsgPath, 0o755);
console.log('[OK] commit-msg hook created\n');

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
