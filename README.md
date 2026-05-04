# Project-Notice-AQA-PW-TS

Production-ready Playwright TypeScript test automation framework using the **Light Page Object Model (Light POM)** pattern combined with Playwright Fixtures.

---

## Tech Stack

| Tool                                 | Purpose                                          |
| ------------------------------------ | ------------------------------------------------ |
| [Playwright](https://playwright.dev) | Core E2E + API testing framework (Chromium only) |
| TypeScript                           | Type-safe automation code                        |
| ESLint + Prettier                    | Code quality and formatting                      |
| Husky + lint-staged                  | Pre-commit hooks                                 |
| GitHub Actions                       | CI/CD pipeline                                   |

---

## Folder Structure

```
.
├── config/            # Environment configuration
│   ├── env.ts         # Type-safe config loader
│   ├── dev.env.ts     # Dev environment config
│   └── staging.env.ts # Staging environment config
├── fixtures/          # Playwright custom fixtures
│   ├── auth.fixture.ts # Authentication helper (UI login flow)
│   └── test.fixture.ts # Extended test with all fixtures
├── helpers/           # Shared utilities
│   ├── logger.ts      # Structured logger
│   ├── waiters.ts     # Wait utility functions
│   └── dataBuilder.ts # Test data factories
├── models/            # API DTO models (TypeScript interfaces)
│   ├── user.model.ts
│   └── auth.model.ts
├── pages/             # Light POM page objects (selectors + atomic actions only)
│   ├── common.page.ts
│   ├── login.page.ts
│   └── dashboard.page.ts
├── tests/
│   ├── e2e/           # End-to-end UI tests (Chromium)
│   │   └── login.test.ts
│   └── api/           # API-only tests (no UI)
│       └── auth.test.ts
├── .github/
│   └── workflows/
│       └── ci.yml     # GitHub Actions CI pipeline
├── playwright.config.ts
├── tsconfig.json
├── .eslintrc.js
└── .prettierrc
```

---

## Architecture: Light POM + Fixtures

### Light POM Principles

- **Page objects** contain **only** CSS selectors and **atomic UI actions** (click, fill, navigate, get text).
- Page objects contain **no business logic**.
- **Business logic** lives exclusively in **test files** and **fixtures**.

### Fixtures

- `envConfig` — resolved environment configuration injected into every test.
- `authenticatedPage` — browser page that has completed the UI login flow.
- `unauthenticatedPage` — clean browser context (no session).
- `loginPage`, `dashboardPage`, `commonPage` — pre-instantiated page objects.
- `apiContext` — Playwright request context for API tests (no browser dependency).

---

## Quick Start

### Prerequisites

- Node.js ≥ 20
- npm ≥ 10

### Install

```bash
npm install
npx playwright install chromium
```

### Run Tests

```bash
# All tests (dev environment)
npm test

# E2E tests only
npm run test:e2e

# API tests only
npm run test:api

# Regression tag only
npm run test:regression

# Against staging environment
npm run test:staging
```

### Lint & Format

```bash
npm run lint        # ESLint check
npm run lint:fix    # ESLint auto-fix
npm run format      # Prettier write
npm run format:check # Prettier check (CI-safe)
```

---

## Environments

| Env       | Variable            | Base URL                      |
| --------- | ------------------- | ----------------------------- |
| `dev`     | `ENV=dev` (default) | `https://dev.example.com`     |
| `staging` | `ENV=staging`       | `https://staging.example.com` |

Credentials are loaded from environment variables:

| Variable           | Description                  |
| ------------------ | ---------------------------- |
| `DEV_USERNAME`     | Dev environment username     |
| `DEV_PASSWORD`     | Dev environment password     |
| `STAGING_USERNAME` | Staging environment username |
| `STAGING_PASSWORD` | Staging environment password |

---

## Tagging

Tests are tagged using `@regression` in the test description. Run with:

```bash
npm run test:regression
# equivalent to: playwright test --grep @regression
```

---

## CI/CD

GitHub Actions runs on push/PR to `main`, `master`, and `develop` branches:

1. Install Node.js dependencies
2. Install Playwright Chromium browser
3. Run ESLint
4. Run Prettier format check
5. Run E2E tests (Chromium)
6. Run API tests
7. Upload Playwright HTML report as artifact
