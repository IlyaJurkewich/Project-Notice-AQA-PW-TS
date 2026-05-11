export interface EnvConfig {
  env: 'dev' | 'staging';
  baseUrl: string;
  apiBaseUrl: string;
  credentials: {
    username: string;
    password: string;
  };
}

export function getEnvConfig(): EnvConfig {
  const env = (process.env.ENV ?? 'staging') as 'staging' | 'dev';

  if (env === 'staging') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { stagingConfig } = require('./staging.env');
    return stagingConfig as EnvConfig;
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { devConfig } = require('./dev.env');
  return devConfig as EnvConfig;
}
