import type { ESLintConfig, HardLintConfig } from './types.js';

export function createHardLintConfig(): ESLintConfig[] {
  const configs: ESLintConfig[] = [];
  return configs;
}

export const SEVERITY = {
  ERROR: 'error' as const,
  WARN: 'warn' as const,
  OFF: 'off' as const
};

export const PRESETS = {
  strict: (): HardLintConfig => ({
    e2eRules: true,
    nextRules: true,
    defaultSeverity: 'error'
  }),

  moderate: (): HardLintConfig => ({
    e2eRules: true,
    nextRules: true,
    defaultSeverity: 'warn'
  }),

  minimal: (): HardLintConfig => ({
    e2eRules: false,
    nextRules: false,
    defaultSeverity: 'warn'
  })
};
