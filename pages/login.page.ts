import { Page, Locator } from '@playwright/test';

/**
 * LoginPage contains selectors and atomic UI actions for the login screen.
 * Light POM: only selectors and atomic UI actions — no business logic.
 */
export class LoginPage {
  readonly page: Page;

  // Selectors
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly forgotPasswordLink: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly createAccountLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button:has-text("Sign in")');
    this.errorMessage = page.locator('[class*="MuiAlert-message"]');
    this.forgotPasswordLink = page.locator(':has-text("Reset Password")');
    this.rememberMeCheckbox = page.locator('[data-testid="remember-me-checkbox"]');
    this.createAccountLink = page.locator('button:has-text("Don\'t have an account? Create one!")');
  }

  async goto(): Promise<void> {
    await this.page.goto('/auth/sign-in');
  }

  async fillUsername(value: string): Promise<void> {
    await this.usernameInput.fill(value);
  }

  async fillPassword(value: string): Promise<void> {
    await this.passwordInput.fill(value);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async getErrorText(): Promise<string> {
    return this.errorMessage.innerText();
  }

  async clickForgotPassword(): Promise<void> {
    await this.forgotPasswordLink.click();
  }

  async clickCreateAccount(): Promise<void> {
    await this.createAccountLink.click();
  }

  async checkRememberMe(): Promise<void> {
    await this.rememberMeCheckbox.check();
  }
}
