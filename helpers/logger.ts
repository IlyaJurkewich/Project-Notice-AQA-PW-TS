type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const currentLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) ?? 'info';

function shouldLog(level: LogLevel): boolean {
  return LEVELS[level] >= LEVELS[currentLevel];
}

function timestamp(): string {
  return new Date().toISOString();
}

function format(level: LogLevel, message: string, context?: unknown): string {
  const contextStr = context !== undefined ? ` | ${JSON.stringify(context)}` : '';
  return `[${timestamp()}] [${level.toUpperCase()}] ${message}${contextStr}`;
}

export const logger = {
  info(message: string, context?: unknown): void {
    if (shouldLog('info')) {
      console.info(format('info', message, context));
    }
  },

  warn(message: string, context?: unknown): void {
    if (shouldLog('warn')) {
      console.warn(format('warn', message, context));
    }
  },

  error(message: string, context?: unknown): void {
    if (shouldLog('error')) {
      console.error(format('error', message, context));
    }
  },

  debug(message: string, context?: unknown): void {
    if (shouldLog('debug')) {
      console.debug(format('debug', message, context));
    }
  },
};
