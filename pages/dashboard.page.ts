import { Page, Locator } from '@playwright/test';

/**
 * DashboardPage contains selectors and atomic UI actions for the dashboard screen.
 * Light POM: only selectors and atomic UI actions — no business logic.
 */
export class DashboardPage {
  readonly page: Page;

  // Navigation selectors
  readonly sidebarNav: Locator;
  readonly navMenuItems: Locator;
  readonly userAvatarButton: Locator;
  readonly userDropdownMenu: Locator;
  readonly logoutButton: Locator;

  // Content selectors
  readonly welcomeHeading: Locator;
  readonly statsCards: Locator;
  readonly notificationsIcon: Locator;
  readonly notificationsBadge: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation
    this.sidebarNav = page.locator('[data-testid="sidebar-nav"]');
    this.navMenuItems = page.locator('[data-testid="nav-menu-item"]');
    this.userAvatarButton = page.locator('[data-testid="user-avatar-button"]');
    this.userDropdownMenu = page.locator('[data-testid="user-dropdown-menu"]');
    this.logoutButton = page.locator('[data-testid="logout-button"]');

    // Content
    this.welcomeHeading = page.locator('[data-testid="welcome-heading"]');
    this.statsCards = page.locator('[data-testid="stats-card"]');
    this.notificationsIcon = page.locator('[data-testid="notifications-icon"]');
    this.notificationsBadge = page.locator('[data-testid="notifications-badge"]');
    this.searchInput = page.locator('[data-testid="search-input"]');
  }

  async goto(): Promise<void> {
    await this.page.goto('/dashboard');
  }

  async clickUserAvatar(): Promise<void> {
    await this.userAvatarButton.click();
  }

  async clickLogout(): Promise<void> {
    await this.logoutButton.click();
  }

  async getWelcomeText(): Promise<string> {
    return this.welcomeHeading.innerText();
  }

  async fillSearch(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }

  async getStatsCardCount(): Promise<number> {
    return this.statsCards.count();
  }

  async clickNavItem(itemText: string): Promise<void> {
    await this.navMenuItems.filter({ hasText: itemText }).click();
  }
}
