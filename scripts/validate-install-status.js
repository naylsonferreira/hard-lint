#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const HOOKS_PATH = '.hardlint/_';
const REQUIRED_HOOKS = ['pre-commit', 'commit-msg'];

function main() {
  const projectRoot = process.cwd();
  const hooksDir = path.join(projectRoot, HOOKS_PATH);

  const missingHooks = REQUIRED_HOOKS.filter(
    (hook) => !fs.existsSync(path.join(hooksDir, hook))
  );

  let configuredPath = '';
  try {
    configuredPath = execSync('git config core.hooksPath', {
      cwd: projectRoot,
      stdio: ['ignore', 'pipe', 'ignore']
    })
      .toString()
      .trim();
  } catch {
    configuredPath = '';
  }

  if (missingHooks.length === 0 && configuredPath === HOOKS_PATH) {
    process.exit(0);
  }

  console.error('ERROR: hard-lint hooks are not installed.');
  if (missingHooks.length > 0) {
    console.error(`Missing hooks in ${HOOKS_PATH}: ${missingHooks.join(', ')}`);
  }
  if (configuredPath !== HOOKS_PATH) {
    console.error(`git core.hooksPath is "${configuredPath || '(unset)'}", expected "${HOOKS_PATH}".`);
  }
  console.error('Run "npx hardlint" (or "node node_modules/hard-lint/scripts/install.js") to set up git hooks.');
  process.exit(1);
}

main();
