import { CreateUserDto } from '../models/user.model';
import { LoginRequestDto } from '../models/auth.model';

let counter = 0;

function uniqueSuffix(): string {
  counter += 1;
  return `${Date.now()}_${counter}`;
}

/**
 * Builds a unique CreateUserDto with optional overrides.
 */
export function buildUser(overrides: Partial<CreateUserDto> = {}): CreateUserDto {
  const suffix = uniqueSuffix();
  return {
    username: `user_${suffix}`,
    email: `user_${suffix}@example.com`,
    password: 'Test@12345!',
    firstName: 'Test',
    lastName: 'User',
    role: 'viewer',
    ...overrides,
  };
}

/**
 * Builds a LoginRequestDto from credentials.
 */
export function buildLoginRequest(
  username: string,
  password: string,
  overrides: Partial<LoginRequestDto> = {},
): LoginRequestDto {
  return {
    username,
    password,
    ...overrides,
  };
}

/**
 * Returns a random element from an array.
 */
export function randomFrom<T>(items: T[]): T {
  if (items.length === 0) throw new Error('Cannot pick from an empty array');
  return items[Math.floor(Math.random() * items.length)];
}

/**
 * Generates a random alphanumeric string of the given length.
 */
export function randomString(length = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}
