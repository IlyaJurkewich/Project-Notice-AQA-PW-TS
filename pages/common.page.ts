import { Page, Locator } from '@playwright/test';

/**
 * CommonPage contains shared UI actions and selectors used across all pages.
 * Light POM: only selectors and atomic UI actions — no business logic.
 */
export class CommonPage {
  readonly page: Page;

  // Shared selectors
  readonly loadingSpinner: Locator;
  readonly toastMessage: Locator;
  readonly toastCloseButton: Locator;
  readonly modalDialog: Locator;
  readonly modalConfirmButton: Locator;
  readonly modalCancelButton: Locator;
  readonly pageTitle: Locator;
  readonly welcomeMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loadingSpinner = page.locator('[data-testid="loading-spinner"]');
    this.toastMessage = page.locator('[data-testid="toast-message"]');
    this.toastCloseButton = page.locator('[data-testid="toast-close"]');
    this.modalDialog = page.locator('[role="dialog"]');
    this.modalConfirmButton = page.locator('[data-testid="modal-confirm"]');
    this.modalCancelButton = page.locator('[data-testid="modal-cancel"]');
    this.pageTitle = page.locator('h1');
    this.welcomeMessage = page.locator(':has-text("Welcome")').first();
  }

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async getToastText(): Promise<string> {
    return this.toastMessage.innerText();
  }

  async closeToast(): Promise<void> {
    await this.toastCloseButton.click();
  }

  async confirmModal(): Promise<void> {
    await this.modalConfirmButton.click();
  }

  async cancelModal(): Promise<void> {
    await this.modalCancelButton.click();
  }

  async getPageTitle(): Promise<string> {
    return this.pageTitle.innerText();
  }
}
