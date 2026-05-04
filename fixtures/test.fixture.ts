import { test as base, Page, APIRequestContext } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { CommonPage } from '../pages/common.page';
import { EnvConfig, getEnvConfig } from '../config/env';
import { authenticateViaUI } from './auth.fixture';

export interface TestFixtures {
  /** Resolved environment configuration */
  envConfig: EnvConfig;
  /** Pre-authenticated page — starts every test already logged in */
  authenticatedPage: Page;
  /** Unauthenticated page — a clean browser context */
  unauthenticatedPage: Page;
  /** Page object instances */
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  commonPage: CommonPage;
  /** Playwright API request context for API tests */
  apiContext: APIRequestContext;
}

export const test = base.extend<TestFixtures>({
  envConfig: async ({}, use) => {
    const config = getEnvConfig();
    await use(config);
  },

  authenticatedPage: async ({ page, envConfig }, use) => {
    await authenticateViaUI(page, envConfig);
    await use(page);
  },

  unauthenticatedPage: async ({ page }, use) => {
    await use(page);
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  commonPage: async ({ page }, use) => {
    await use(new CommonPage(page));
  },

  apiContext: async ({ playwright, envConfig }, use) => {
    const context = await playwright.request.newContext({
      baseURL: envConfig.apiBaseUrl,
      extraHTTPHeaders: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    await use(context);
    await context.dispose();
  },
});

export { expect } from '@playwright/test';
