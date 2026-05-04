import { EnvConfig } from './env';

export const devConfig: EnvConfig = {
  env: 'dev',
  baseUrl: 'https://dev.example.com',
  apiBaseUrl: 'https://api.dev.example.com',
  credentials: {
    username: process.env.DEV_USERNAME ?? 'dev_user@example.com',
    password: process.env.DEV_PASSWORD ?? 'dev_password',
  },
};
