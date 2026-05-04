import { test, expect } from '../../fixtures/test.fixture';
import { buildLoginRequest } from '../../helpers/dataBuilder';
import { LoginResponseDto, AuthErrorDto } from '../../models/auth.model';

/**
 * API Authentication tests — @regression
 *
 * Uses Playwright request context only — no UI interaction.
 */
test.describe('Auth API @regression', () => {
  test('POST /auth/login returns 200 with valid credentials @regression', async ({
    apiContext,
    envConfig,
  }) => {
    const payload = buildLoginRequest(
      envConfig.credentials.username,
      envConfig.credentials.password,
    );

    const response = await apiContext.post('/auth/login', { data: payload });

    expect(response.status()).toBe(200);

    const body = (await response.json()) as LoginResponseDto;
    expect(body.accessToken).toBeTruthy();
    expect(body.tokenType).toBe('Bearer');
    expect(body.expiresIn).toBeGreaterThan(0);
  });

  test('POST /auth/login returns 401 with invalid credentials @regression', async ({
    apiContext,
  }) => {
    const payload = buildLoginRequest('nonexistent@example.com', 'wrongpassword');

    const response = await apiContext.post('/auth/login', { data: payload });

    expect(response.status()).toBe(401);

    const body = (await response.json()) as AuthErrorDto;
    expect(body.message).toBeTruthy();
    expect(body.statusCode).toBe(401);
  });

  test('POST /auth/login returns 400 when body is missing required fields', async ({
    apiContext,
  }) => {
    const response = await apiContext.post('/auth/login', {
      data: { username: '' },
    });

    expect([400, 422]).toContain(response.status());
  });

  test('GET /auth/profile returns 401 without token', async ({ apiContext }) => {
    const response = await apiContext.get('/auth/profile');

    expect(response.status()).toBe(401);
  });

  test('GET /auth/profile returns 200 with valid token @regression', async ({
    apiContext,
    envConfig,
  }) => {
    // First obtain a token
    const loginPayload = buildLoginRequest(
      envConfig.credentials.username,
      envConfig.credentials.password,
    );
    const loginResponse = await apiContext.post('/auth/login', { data: loginPayload });
    expect(loginResponse.status()).toBe(200);

    const { accessToken } = (await loginResponse.json()) as LoginResponseDto;

    // Use the token to access the protected endpoint
    const profileResponse = await apiContext.get('/auth/profile', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    expect(profileResponse.status()).toBe(200);
  });
});
