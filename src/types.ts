import type { Linter } from 'eslint';

export interface HardLintConfig {
  e2eRules?: boolean;
  nextRules?: boolean;
  overrides?: Record<string, 'error' | 'warn' | 'off'>;
  defaultSeverity?: 'error' | 'warn' | 'off';
}

export type ESLintConfig = Linter.Config;
