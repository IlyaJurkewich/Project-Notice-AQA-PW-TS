import { EnvConfig } from './env';

export const stagingConfig: EnvConfig = {
  env: 'staging',
  baseUrl: 'https://frontend.staging.thenoticingcenter.com',
  apiBaseUrl: 'https://api.staging.example.com',
  credentials: {
    username: process.env.STAGING_USERNAME ?? 'your-staging-email@example.com',
    password: process.env.STAGING_PASSWORD ?? 'your-staging-password',
  },
};
