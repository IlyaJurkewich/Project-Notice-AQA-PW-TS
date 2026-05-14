/**
 * Timeout configurations for all tests and operations
 * All values in milliseconds
 */
export const timeouts = {
  // Page navigation timeouts
  page: {
    navigation: 15_000, // Wait for URL change
    load: 10_000, // Wait for page to fully load
  },

  // Element visibility/interaction timeouts
  element: {
    visibility: 10_000, // Wait for element to be visible
    interaction: 5_000, // Wait for element to be clickable
    disappearance: 5_000, // Wait for element to disappear
  },

  // Form operations
  form: {
    submission: 15_000, // Wait for form submission
    validation: 5_000, // Wait for validation messages
  },

  // Authentication
  auth: {
    login: 15_000, // Wait for login to complete
    logout: 10_000, // Wait for logout to complete
  },

  // API operations
  api: {
    request: 10_000, // Wait for API response
    shortRequest: 5_000, // Quick API calls
  },

  // Toast/notifications
  notification: {
    appearance: 3_000, // Wait for toast to appear
    disappearance: 5_000, // Wait for toast to disappear
  },

  // Modal operations
  modal: {
    appearance: 5_000, // Wait for modal to appear
    interaction: 10_000, // Wait for modal interaction
  },

  // Default timeout
  default: 10_000,
} as const;

/**
 * Helper function to get timeout value
 * @param section - Section name (e.g., 'page', 'element')
 * @param key - Timeout key (e.g., 'navigation', 'visibility')
 * @returns Timeout value in milliseconds
 */
export function getTimeout(
  section: keyof typeof timeouts,
  key?: string
): number {
  if (section === 'default') {
    return timeouts.default;
  }

  const sectionTimeouts = timeouts[section] as Record<string, number>;

  if (!key) {
    return timeouts.default;
  }

  return sectionTimeouts[key] || timeouts.default;
}
