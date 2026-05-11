import { test, expect } from '../../fixtures/test.fixture';

/**
 * E2E Login tests — @regression
 *
 * Business logic lives here; page objects only expose atomic UI actions.
 * Auth fixture handles the UI login flow.
 * Uses staging environment with credentials from config/staging.env.ts
 */
test.describe('Login @regression', () => {
  test('should verify login form structure and visibility', async ({ loginPage }) => {
    await loginPage.goto();

    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ loginPage }) => {
    await loginPage.goto();

    await loginPage.fillUsername('invalid@example.com');
    await loginPage.fillPassword('wrongpassword');

    await loginPage.clickLogin();

    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorText();
    expect(errorText.length).toBeGreaterThan(0);
  });

  test('should login successfully with valid credentials and navigate to home page', async ({ loginPage, dashboardPage, envConfig }) => {
    await loginPage.goto();

    // Use valid credentials from the environment configuration
    await loginPage.fillUsername(envConfig.credentials.username);
    await loginPage.fillPassword(envConfig.credentials.password);

    await loginPage.clickLogin();

    // Wait for navigation to dashboard
    await dashboardPage.page.waitForURL('**/home**', { timeout: 10000 });

    // Verify we're on the home page (dashboard) by checking key elements
    await expect(dashboardPage.sidebarNav).toBeVisible();
  });

  test('should navigate to Home page when clicking Home button', async ({ authenticatedPage, dashboardPage }) => {

    await dashboardPage.homeButton.click();

    // Wait for navigation and verify URL contains "home"
    await dashboardPage.page.waitForURL('**/home**', { timeout: 10000 });
  });

  test('should navigate to Job History page when clicking Job History button', async ({ authenticatedPage, dashboardPage }) => {

    await dashboardPage.jobHistoryButton.click();

    // Wait for navigation and verify URL contains "history"
    await dashboardPage.page.waitForURL('**/history**', { timeout: 10000 });
    expect(dashboardPage.page.url()).toContain('history');
  });
});
