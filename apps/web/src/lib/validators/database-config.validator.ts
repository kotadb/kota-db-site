import { z } from "zod";
import { createValidator } from "./base.validator";

/**
 * Database configuration validator with comprehensive validation rules
 */
export const DatabaseConfigSchema = z.object({
  host: z.string().min(1).max(255),
  port: z.number().int().positive().max(65535),
  database: z.string().min(1).max(100),
  username: z.string().min(1).max(100),
  password: z.string().min(8),
  ssl: z.boolean().default(true),
  poolSize: z.number().int().positive().max(100).default(10),
  connectionTimeout: z.number().int().positive().max(60000).default(5000),
  retryAttempts: z.number().int().min(0).max(10).default(3),
  retryDelay: z.number().int().positive().max(10000).default(1000),
  debug: z.boolean().default(false),
});

export type DatabaseConfig = z.infer<typeof DatabaseConfigSchema>;

export const databaseConfigValidator = createValidator(DatabaseConfigSchema, {
  ssl: true,
  poolSize: 10,
  connectionTimeout: 5000,
  retryAttempts: 3,
  retryDelay: 1000,
  debug: false,
});

/**
 * Environment-specific database configuration factories
 */
export const createDevelopmentConfig = (
  overrides?: Partial<DatabaseConfig>,
): DatabaseConfig => {
  return databaseConfigValidator.parse({
    host: "localhost",
    port: 5432,
    database: "kotadb_dev",
    username: "dev_user",
    password: "development_password",
    ssl: false,
    debug: true,
    ...overrides,
  });
};

export const createProductionConfig = (
  overrides?: Partial<DatabaseConfig>,
): DatabaseConfig => {
  return databaseConfigValidator.parse({
    host: process.env["DB_HOST"] || "production-host",
    port: parseInt(process.env["DB_PORT"] || "5432", 10),
    database: process.env["DB_NAME"] || "kotadb_prod",
    username: process.env["DB_USER"] || "prod_user",
    password: process.env["DB_PASSWORD"] || "",
    ssl: true,
    poolSize: 20,
    connectionTimeout: 10000,
    retryAttempts: 5,
    debug: false,
    ...overrides,
  });
};

export const createTestConfig = (
  overrides?: Partial<DatabaseConfig>,
): DatabaseConfig => {
  return databaseConfigValidator.parse({
    host: "localhost",
    port: 5433,
    database: "kotadb_test",
    username: "test_user",
    password: "test_password",
    ssl: false,
    poolSize: 5,
    connectionTimeout: 2000,
    retryAttempts: 1,
    debug: false,
    ...overrides,
  });
};
