import { type DatabaseConfig } from "../validators/config.validator";

interface RetryPolicy {
  maxAttempts: number;
  initialDelay: number;
  maxDelay: number;
  execute<T>(fn: () => Promise<T>): Promise<T>;
}

interface Logger {
  debug(message: string, data?: unknown): void;
  info(message: string, data?: unknown): void;
  warn(message: string, data?: unknown): void;
  error(message: string, error?: unknown): void;
}

interface Cache {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
}

interface Validator {
  validate<T>(data: unknown): T;
}

class ExponentialBackoffRetry implements RetryPolicy {
  constructor(
    public maxAttempts = 3,
    public initialDelay = 1000,
    public maxDelay = 10000,
  ) {}

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    let lastError: Error | undefined;
    let delay = this.initialDelay;

    for (let attempt = 1; attempt <= this.maxAttempts; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;
        if (attempt === this.maxAttempts) {
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
        delay = Math.min(delay * 2, this.maxDelay);
      }
    }

    throw lastError;
  }
}

class StructuredLogger implements Logger {
  private formatMessage(level: string, message: string, data?: unknown): void {
    const timestamp = new Date().toISOString();
    const logEntry: Record<string, unknown> = {
      timestamp,
      level,
      message,
    };
    if (data) {
      logEntry["data"] = data;
    }
    console.error(JSON.stringify(logEntry));
  }

  debug(message: string, data?: unknown): void {
    if (process.env.NODE_ENV === "development") {
      this.formatMessage("DEBUG", message, data);
    }
  }

  info(message: string, data?: unknown): void {
    this.formatMessage("INFO", message, data);
  }

  warn(message: string, data?: unknown): void {
    this.formatMessage("WARN", message, data);
  }

  error(message: string, error?: unknown): void {
    this.formatMessage("ERROR", message, error);
  }
}

class MemoryCache implements Cache {
  private store = new Map<string, { value: unknown; expiry?: number }>();

  async get<T>(key: string): Promise<T | null> {
    const item = this.store.get(key);
    if (!item) {
      return null;
    }
    if (item.expiry && Date.now() > item.expiry) {
      this.store.delete(key);
      return null;
    }
    return item.value as T;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    if (ttl) {
      this.store.set(key, { value, expiry: Date.now() + ttl });
    } else {
      this.store.set(key, { value });
    }
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }

  async clear(): Promise<void> {
    this.store.clear();
  }
}

class StrictValidator implements Validator {
  validate<T>(data: unknown): T {
    return data as T;
  }
}

interface ExtendedDatabaseConfig extends DatabaseConfig {
  retryPolicy?: RetryPolicy;
  logger?: Logger;
  cache?: Cache;
  validator?: Validator;
}

export class Database {
  constructor(private config: ExtendedDatabaseConfig) {}

  async connect(): Promise<void> {
    const retryPolicy =
      this.config.retryPolicy ?? new ExponentialBackoffRetry();
    const logger = this.config.logger ?? new StructuredLogger();

    await retryPolicy.execute(async () => {
      logger.info("Connecting to database", {
        host: this.config.host,
        port: this.config.port,
        database: this.config.database,
      });
    });
  }

  async query<T>(sql: string, params?: unknown[]): Promise<T[]> {
    const logger = this.config.logger ?? new StructuredLogger();
    logger.debug("Executing query", { sql, params });
    return [] as T[];
  }

  async disconnect(): Promise<void> {
    const logger = this.config.logger ?? new StructuredLogger();
    logger.info("Disconnecting from database");
  }
}

export class DatabaseFactory {
  static createProduction(config: DatabaseConfig): Database {
    return new Database({
      ...config,
      retryPolicy: new ExponentialBackoffRetry(5, 1000, 30000),
      logger: new StructuredLogger(),
      cache: new MemoryCache(),
      validator: new StrictValidator(),
    });
  }

  static createDevelopment(config: DatabaseConfig): Database {
    return new Database({
      ...config,
      retryPolicy: new ExponentialBackoffRetry(3, 500, 5000),
      logger: new StructuredLogger(),
      cache: new MemoryCache(),
      validator: new StrictValidator(),
    });
  }

  static createTesting(config: DatabaseConfig): Database {
    return new Database({
      ...config,
      retryPolicy: new ExponentialBackoffRetry(1, 0, 0),
      logger: new StructuredLogger(),
      cache: new MemoryCache(),
      validator: new StrictValidator(),
    });
  }

  static createWithFailureInjection(
    config: DatabaseConfig,
    failureRate = 0.1,
  ): Database {
    class FailureInjectionDatabase extends Database {
      override async query<T>(sql: string, params?: unknown[]): Promise<T[]> {
        if (Math.random() < failureRate) {
          throw new Error("Injected failure for testing");
        }
        return super.query<T>(sql, params);
      }
    }

    return new FailureInjectionDatabase({
      ...config,
      retryPolicy: new ExponentialBackoffRetry(),
      logger: new StructuredLogger(),
      cache: new MemoryCache(),
      validator: new StrictValidator(),
    });
  }
}
