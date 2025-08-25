import { z } from "zod";

export const DatabaseConfigSchema = z.object({
  host: z.string().min(1),
  port: z.number().int().positive().max(65535),
  database: z.string().min(1),
  user: z.string().min(1),
  password: z.string().min(1),
  ssl: z.boolean().default(true),
  maxConnections: z.number().int().positive().default(10),
  connectionTimeout: z.number().int().positive().default(5000),
  idleTimeout: z.number().int().positive().default(30000),
});

export type DatabaseConfig = z.infer<typeof DatabaseConfigSchema>;

export const AppConfigSchema = z.object({
  env: z.enum(["development", "staging", "production"]),
  port: z.number().int().positive().max(65535).default(3000),
  host: z.string().default("localhost"),
  logLevel: z.enum(["debug", "info", "warn", "error"]).default("info"),
  corsOrigins: z.array(z.string().url()).default([]),
  rateLimit: z
    .object({
      windowMs: z.number().int().positive().default(60000),
      maxRequests: z.number().int().positive().default(100),
    })
    .default(() => ({ windowMs: 60000, maxRequests: 100 })),
  features: z
    .object({
      analytics: z.boolean().default(false),
      darkMode: z.boolean().default(true),
      experimental: z.boolean().default(false),
    })
    .default(() => ({ analytics: false, darkMode: true, experimental: false })),
});

export type AppConfig = z.infer<typeof AppConfigSchema>;

export function validateDatabaseConfig(input: unknown): DatabaseConfig {
  return DatabaseConfigSchema.parse(input);
}

export function validateAppConfig(input: unknown): AppConfig {
  return AppConfigSchema.parse(input);
}

export function loadConfigFromEnv(): AppConfig {
  return validateAppConfig({
    env: process.env["NODE_ENV"] ?? "development",
    port: process.env["PORT"] ? parseInt(process.env["PORT"], 10) : undefined,
    host: process.env["HOST"],
    logLevel: process.env["LOG_LEVEL"],
    corsOrigins: process.env["CORS_ORIGINS"]?.split(",") ?? [],
    rateLimit: {
      windowMs: process.env["RATE_LIMIT_WINDOW_MS"]
        ? parseInt(process.env["RATE_LIMIT_WINDOW_MS"], 10)
        : undefined,
      maxRequests: process.env["RATE_LIMIT_MAX_REQUESTS"]
        ? parseInt(process.env["RATE_LIMIT_MAX_REQUESTS"], 10)
        : undefined,
    },
    features: {
      analytics: process.env["FEATURE_ANALYTICS"] === "true",
      darkMode: process.env["FEATURE_DARK_MODE"] !== "false",
      experimental: process.env["FEATURE_EXPERIMENTAL"] === "true",
    },
  });
}
