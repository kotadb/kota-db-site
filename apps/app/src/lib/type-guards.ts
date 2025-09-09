import type { ApiKey, Repository, UsageMetric } from "@kotadb/shared";
import { z } from "zod";

const ApiKeySchema = z.object({
  id: z.string(),
  user_id: z.string(),
  key_hash: z.string(),
  key_prefix: z.string(),
  name: z.string().nullish(),
  last_used_at: z.string().nullish(),
  created_at: z.string(),
  revoked_at: z.string().nullish(),
});

const RepositorySchema = z.object({
  id: z.string(),
  user_id: z.string(),
  github_url: z.string(),
  name: z.string(),
  status: z.enum(["pending", "indexing", "complete", "failed"]),
  error_message: z.string().nullish(),
  indexed_at: z.string().nullish(),
  created_at: z.string(),
  updated_at: z.string(),
});

const UsageMetricSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  date: z.string(),
  queries_count: z.number(),
  context_saved_mb: z.string(),
  storage_used_mb: z.string(),
  created_at: z.string(),
});

export function isApiKey(data: unknown): data is ApiKey {
  try {
    ApiKeySchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

export function validateApiKey(data: unknown): ApiKey {
  const parsed = ApiKeySchema.parse(data);
  return {
    id: parsed.id,
    user_id: parsed.user_id,
    key_hash: parsed.key_hash,
    key_prefix: parsed.key_prefix,
    created_at: parsed.created_at,
    ...(parsed.name !== null &&
      parsed.name !== undefined && { name: parsed.name }),
    ...(parsed.last_used_at !== null &&
      parsed.last_used_at !== undefined && {
        last_used_at: parsed.last_used_at,
      }),
    ...(parsed.revoked_at !== null &&
      parsed.revoked_at !== undefined && { revoked_at: parsed.revoked_at }),
  };
}

export function validateApiKeys(data: unknown): ApiKey[] {
  if (!Array.isArray(data)) {
    return [];
  }
  return data.filter(isApiKey).map((item) => validateApiKey(item));
}

export function isRepository(data: unknown): data is Repository {
  try {
    RepositorySchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

export function validateRepository(data: unknown): Repository {
  const parsed = RepositorySchema.parse(data);
  return {
    id: parsed.id,
    user_id: parsed.user_id,
    github_url: parsed.github_url,
    name: parsed.name,
    status: parsed.status,
    created_at: parsed.created_at,
    updated_at: parsed.updated_at,
    ...(parsed.error_message !== null &&
      parsed.error_message !== undefined && {
        error_message: parsed.error_message,
      }),
    ...(parsed.indexed_at !== null &&
      parsed.indexed_at !== undefined && { indexed_at: parsed.indexed_at }),
  };
}

export function validateRepositories(data: unknown): Repository[] {
  if (!Array.isArray(data)) {
    return [];
  }
  return data.filter(isRepository).map((item) => validateRepository(item));
}

export function isUsageMetric(data: unknown): data is UsageMetric {
  try {
    UsageMetricSchema.parse(data);
    return true;
  } catch {
    return false;
  }
}

export function validateUsageMetric(data: unknown): UsageMetric {
  return UsageMetricSchema.parse(data);
}

export function validateUsageMetrics(data: unknown): UsageMetric[] {
  if (!Array.isArray(data)) {
    return [];
  }
  return data.filter(isUsageMetric);
}

export function formatError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  return "An unknown error occurred";
}
