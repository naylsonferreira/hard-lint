/**
 * Tipos para a configuração hard-lint
 */

import type { Linter } from 'eslint';

export interface HardLintConfig {
  /**
   * Habilita regras rigorosas para testes E2E
   * @default true
   */
  e2eRules?: boolean;

  /**
   * Habilita regras do Next.js
   * @default true
   */
  nextRules?: boolean;

  /**
   * Sobrescreve regras específicas
   */
  overrides?: Record<string, 'error' | 'warn' | 'off'>;

  /**
   * Severidade padrão para regras personalizadas
   * @default 'error'
   */
  defaultSeverity?: 'error' | 'warn' | 'off';
}

export type ESLintConfig = Linter.Config;
