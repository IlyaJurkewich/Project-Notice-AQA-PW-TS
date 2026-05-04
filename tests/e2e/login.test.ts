import { test, expect } from '../../fixtures/test.fixture';

/**
 * E2E Login tests — @regression
 *
 * Business logic lives here; page objects only expose atomic UI actions.
 * Auth fixture handles the UI login flow.
 */
test.describe('Login @regression', () => {
  test('should display login form elements', async ({ loginPage }) => {
    await loginPage.goto();

    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.forgotPasswordLink).toBeVisible();
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

  test('should redirect to dashboard after successful login @regression', async ({
    authenticatedPage,
    dashboardPage,
  }) => {
    await expect(authenticatedPage).toHaveURL(/\/dashboard/);
    await expect(dashboardPage.welcomeHeading).toBeVisible();
  });

  test('should allow logout from dashboard @regression', async ({
    authenticatedPage,
    dashboardPage,
    loginPage,
  }) => {
    await expect(authenticatedPage).toHaveURL(/\/dashboard/);

    await dashboardPage.clickUserAvatar();
    await dashboardPage.clickLogout();

    await expect(authenticatedPage).toHaveURL(/\/login/);
    await expect(loginPage.loginButton).toBeVisible();
  });
});
