#!/usr/bin/env node
/**
 * Hard-Lint Commit-Msg Hook
 * Validates commit messages with commitlint
 */
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const hardlintRoot = path.join(__dirname, '..', '..');
const commitlintBin = path.join(hardlintRoot, 'node_modules', '@commitlint', 'cli', 'lib', 'cli.js');
const commitlintConfig = path.join(hardlintRoot, 'commitlint.config.cjs');

try {
  execSync(`node "${commitlintBin}" --edit "$1" --config "${commitlintConfig}"`, {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: true,
    env: { ...process.env },
  });
  process.exit(0);
} catch (error) {
  process.exit(1);
}
