import type { DatabaseConfig } from "@/lib/validators/database-config.validator";
import { databaseConfigValidator } from "@/lib/validators/database-config.validator";

/**
 * Fluent builder pattern for database configuration
 * Provides a pit-of-success API that guides correct usage
 */
export class DatabaseBuilder {
  private config: Partial<DatabaseConfig> = {};

  /**
   * Set the database host
   */
  withHost(host: string): this {
    this.config.host = host;
    return this;
  }

  /**
   * Set the database port
   */
  withPort(port: number): this {
    this.config.port = port;
    return this;
  }

  /**
   * Set the database name
   */
  withDatabase(database: string): this {
    this.config.database = database;
    return this;
  }

  /**
   * Set authentication credentials
   */
  withCredentials(username: string, password: string): this {
    this.config.username = username;
    this.config.password = password;
    return this;
  }

  /**
   * Enable SSL connection
   */
  withSSL(enabled = true): this {
    this.config.ssl = enabled;
    return this;
  }

  /**
   * Configure connection pool
   */
  withPool(size: number, timeout?: number): this {
    this.config.poolSize = size;
    if (timeout !== undefined) {
      this.config.connectionTimeout = timeout;
    }
    return this;
  }

  /**
   * Configure retry behavior
   */
  withRetry(attempts: number, delay?: number): this {
    this.config.retryAttempts = attempts;
    if (delay !== undefined) {
      this.config.retryDelay = delay;
    }
    return this;
  }

  /**
   * Enable debug mode
   */
  withDebug(enabled = true): this {
    this.config.debug = enabled;
    return this;
  }

  /**
   * Build and validate the configuration
   */
  build(): DatabaseConfig {
    return databaseConfigValidator.parse(this.config);
  }

  /**
   * Create a development configuration preset
   */
  static development(): DatabaseBuilder {
    return new DatabaseBuilder()
      .withHost("localhost")
      .withPort(5432)
      .withDatabase("kotadb_dev")
      .withCredentials("dev_user", "development_password")
      .withSSL(false)
      .withDebug(true)
      .withPool(10, 5000)
      .withRetry(3, 1000);
  }

  /**
   * Create a production configuration preset
   */
  static production(): DatabaseBuilder {
    return new DatabaseBuilder()
      .withHost(process.env["DB_HOST"] || "production-host")
      .withPort(parseInt(process.env["DB_PORT"] || "5432", 10))
      .withDatabase(process.env["DB_NAME"] || "kotadb_prod")
      .withCredentials(
        process.env["DB_USER"] || "prod_user",
        process.env["DB_PASSWORD"] || "",
      )
      .withSSL(true)
      .withDebug(false)
      .withPool(20, 10000)
      .withRetry(5, 2000);
  }

  /**
   * Create a test configuration preset
   */
  static test(): DatabaseBuilder {
    return new DatabaseBuilder()
      .withHost("localhost")
      .withPort(5433)
      .withDatabase("kotadb_test")
      .withCredentials("test_user", "test_password")
      .withSSL(false)
      .withDebug(false)
      .withPool(5, 2000)
      .withRetry(1, 500);
  }
}
