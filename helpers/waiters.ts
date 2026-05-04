import { Page, Locator } from '@playwright/test';

const DEFAULT_TIMEOUT_MS = 10_000;
const POLL_INTERVAL_MS = 500;

/**
 * Waits for a locator to be visible within the given timeout.
 */
export async function waitForVisible(
  locator: Locator,
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
): Promise<void> {
  await locator.waitFor({ state: 'visible', timeout: timeoutMs });
}

/**
 * Waits for a locator to be hidden or detached.
 */
export async function waitForHidden(
  locator: Locator,
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
): Promise<void> {
  await locator.waitFor({ state: 'hidden', timeout: timeoutMs });
}

/**
 * Waits for the page URL to match the given pattern.
 */
export async function waitForUrl(
  page: Page,
  urlPattern: string | RegExp,
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
): Promise<void> {
  await page.waitForURL(urlPattern, { timeout: timeoutMs });
}

/**
 * Polls a condition function until it returns true or timeout is reached.
 */
export async function waitForCondition(
  condition: () => boolean | Promise<boolean>,
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
  intervalMs: number = POLL_INTERVAL_MS,
): Promise<void> {
  const deadline = Date.now() + timeoutMs;

  while (Date.now() < deadline) {
    if (await condition()) return;
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }

  throw new Error(`Condition not met within ${timeoutMs}ms`);
}

/**
 * Waits for the page to finish loading (load state).
 */
export async function waitForNetworkIdle(
  page: Page,
  timeoutMs: number = DEFAULT_TIMEOUT_MS,
): Promise<void> {
  await page.waitForLoadState('load', { timeout: timeoutMs });
}
