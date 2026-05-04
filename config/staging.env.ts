import { EnvConfig } from './env';

export const stagingConfig: EnvConfig = {
  env: 'staging',
  baseUrl: 'https://staging.example.com',
  apiBaseUrl: 'https://api.staging.example.com',
  credentials: {
    username: process.env.STAGING_USERNAME ?? 'staging_user@example.com',
    password: process.env.STAGING_PASSWORD ?? 'staging_password',
  },
};
