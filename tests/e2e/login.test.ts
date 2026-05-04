import { test, expect } from '../../fixtures/test.fixture';

/**
 * E2E Login tests — @regression
 *
 * Business logic lives here; page objects only expose atomic UI actions.
 * Auth fixture handles the UI login flow.
 * Uses staging environment with credentials from config/staging.env.ts
 */
test.describe('Login @regression', () => {
  test('should display login form elements', async ({ loginPage }) => {
    await loginPage.goto();

    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ loginPage, envConfig }) => {
    await loginPage.goto();

    await loginPage.fillUsername('invalid@example.com');
    await loginPage.fillPassword('wrongpassword');
    
    await loginPage.clickLogin();

    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorText();
    expect(errorText.length).toBeGreaterThan(0);
  });
});
