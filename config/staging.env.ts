import { EnvConfig } from './env';

export const stagingConfig: EnvConfig = {
  env: 'staging',
  baseUrl: 'https://frontend.staging.thenoticingcenter.com',
  apiBaseUrl: 'https://api.staging.example.com',
  credentials: {
    username: process.env.STAGING_USERNAME ?? 'pamor77861@inreur.com',
    password: process.env.STAGING_PASSWORD ?? 'Password#12',
  },
};
