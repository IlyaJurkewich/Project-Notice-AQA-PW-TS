import { EnvConfig } from './env';

export const devConfig: EnvConfig = {
  env: 'dev',
  baseUrl: 'https://frontend.thenoticingcenter.com',
  apiBaseUrl: 'https://api.dev.example.com',
  credentials: {
    username: process.env.DEV_USERNAME ?? 'your-dev-email@example.com',
    password: process.env.DEV_PASSWORD ?? 'your-dev-password',
  },
};
