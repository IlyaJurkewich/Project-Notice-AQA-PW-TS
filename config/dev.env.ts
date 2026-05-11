import { EnvConfig } from './env';

export const devConfig: EnvConfig = {
  env: 'dev',
  baseUrl: 'https://frontend.thenoticingcenter.com',
  apiBaseUrl: 'https://api.dev.example.com',
  credentials: {
    username: process.env.DEV_USERNAME ?? 'gewgew@beeinbox.com',
    password: process.env.DEV_PASSWORD ?? 'Password#12',
  },
};
