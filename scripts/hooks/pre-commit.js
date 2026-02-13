#!/usr/bin/env node
/**
 * Hard-Lint Pre-Commit Hook
 * Runs lint-staged to validate staged files
 */
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const hardlintRoot = path.join(__dirname, '..', '..');
const lintStagedBin = path.join(hardlintRoot, 'node_modules', 'lint-staged', 'bin', 'lint-staged.js');

try {
  execSync(`node "${lintStagedBin}"`, {
    cwd: process.cwd(),
    stdio: 'inherit',
  });
  process.exit(0);
} catch (error) {
  process.exit(1);
}
