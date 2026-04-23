/**
 * SDK configuration interface
 */
export interface BadgeForgeConfig {
  /** Required API key for authentication */
  apiKey: string;

  /** Required secret key for signing requests */
  secretKey: string;

  /** Enable debug logging */
  debug?: boolean;

  /** API environment (default: production) */
  environment?: 'production' | 'staging' | 'development';
}

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG: Partial<BadgeForgeConfig> = {
  debug: false,
  environment: 'production',
};

/**
 * API endpoints for different environments
 */
export const API_ENDPOINTS = {
  production: 'https://api.badgeforge.io/',
  staging: 'https://api.staging.badgeforge.io/',
  development: 'http://localhost:8000/',
} as const;
