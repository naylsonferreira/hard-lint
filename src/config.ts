/**
 * Funções para criar configurações hard-lint customizadas
 */

import type { HardLintConfig, ESLintConfig } from './types.js';

/**
 * Cria uma configuração hard-lint customizada
 *
 * @param options - Opções de configuração
 * @returns Array de configurações ESLint
 */
export function createHardLintConfig(): ESLintConfig[] {

  const configs: ESLintConfig[] = [];

  // Configurações base (importadas dinamicamente do eslint.config.mjs)
  // Esta função é um helper que permite customizar a configuração

  /**
   * Exemplo de uso:
   * const config = createHardLintConfig({
   *   nextRules: false,
   *   overrides: {
   *     'no-console': 'warn'
   *   }
   * });
   */

  return configs;
}

/**
 * Tipos de severidade recomendados
 */
export const SEVERITY = {
  ERROR: 'error' as const,
  WARN: 'warn' as const,
  OFF: 'off' as const
};

/**
 * Predefinições de configuração
 */
export const PRESETS = {
  /**
   * Máxima rigorosidade - todas as regras ativadas
   */
  strict: (): HardLintConfig => ({
    e2eRules: true,
    nextRules: true,
    defaultSeverity: 'error'
  }),

  /**
   * Moderado - algumas regras como warn
   */
  moderate: (): HardLintConfig => ({
    e2eRules: true,
    nextRules: true,
    defaultSeverity: 'warn'
  }),

  /**
   * Apenas regras críticas
   */
  minimal: (): HardLintConfig => ({
    e2eRules: false,
    nextRules: false,
    defaultSeverity: 'warn'
  })
};
