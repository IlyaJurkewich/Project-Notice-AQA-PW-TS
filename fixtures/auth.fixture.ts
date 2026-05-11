import { Page } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { EnvConfig } from '../config/env';
import { logger } from '../helpers/logger';
import { waitForUrl } from '../helpers/waiters';
import { timeouts } from '../config/timeouts';

// Constants
const APP_DOMAIN = 'thenoticingcenter';
const POST_LOGIN_URL_PATTERN = new RegExp(APP_DOMAIN, 'i');

/**
 * Performs UI login flow using LoginPage page object.
 * Business logic lives here in the fixture, not in the page object.
 */
export async function authenticateViaUI(page: Page, config: EnvConfig): Promise<void> {
  const loginPage = new LoginPage(page);

  logger.info('Navigating to login page', { env: config.env });
  await loginPage.goto();

  logger.info('Filling credentials', { username: config.credentials.username });
  await loginPage.fillUsername(config.credentials.username);
  await loginPage.fillPassword(config.credentials.password);
  await loginPage.clickLogin();

  logger.info('Waiting for post-login redirect');
  await waitForUrl(page, POST_LOGIN_URL_PATTERN, timeouts.auth.login);
  logger.info('Authentication successful');
}
