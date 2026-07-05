#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = process.cwd();

function run(label, command) {
  console.log(`\n[hard-lint] ${label}...`);
  try {
    execSync(command, { cwd: projectRoot, stdio: 'inherit' });
    return true;
  } catch {
    console.error(`[hard-lint] ${label} failed.`);
    return false;
  }
}

function hasTestScript() {
  const pkgPath = path.join(projectRoot, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    return false;
  }
  try {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    const testScript = pkg.scripts && pkg.scripts.test;
    return Boolean(testScript) && !testScript.includes('no test specified');
  } catch {
    return false;
  }
}

function main() {
  const configOverride = path.join(__dirname, 'validate-no-config-override.js');
  const installStatus = path.join(__dirname, 'validate-install-status.js');
  const barrel = path.join(__dirname, 'validate-barrel-exports.js');

  const usesYarn = fs.existsSync(path.join(projectRoot, 'yarn.lock'));

  const steps = [
    ['config lockdown', `node "${configOverride}"`],
    ['install status', `node "${installStatus}"`],
    ['eslint', 'npx --no-install eslint .'],
    ['barrel exports', `node "${barrel}"`]
  ];

  if (hasTestScript()) {
    steps.push(['tests', usesYarn ? 'yarn test' : 'npm test']);
  } else {
    console.log('\n[hard-lint] no test script found, skipping tests.');
  }

  for (const [label, command] of steps) {
    if (!run(label, command)) {
      console.error('\n[hard-lint] verify FAILED.');
      process.exit(1);
    }
  }

  console.log('\n[hard-lint] verify passed. All checks and tests OK.');
  process.exit(0);
}

main();
