import { describe, expect, it } from "vitest";

import {
  validateRepositories,
  validateApiKeys,
  validateUsageMetrics,
} from "../../lib/type-guards";

describe("type-guards validation", () => {
  it("normalizes repositories and drops null optionals", () => {
    const input = [
      {
        id: "1",
        user_id: "u1",
        github_url: "https://github.com/kotadb/kota-db-site",
        name: "kotadb/kota-db-site",
        status: "pending",
        error_message: null,
        indexed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        extra: "ignore",
      },
    ];
    const out = validateRepositories(input);
    expect(out).toHaveLength(1);
    const repo = out[0]!;
    expect("error_message" in repo).toBe(false);
    expect("indexed_at" in repo).toBe(false);
    expect(repo.name).toBe("kotadb/kota-db-site");
  });

  it("normalizes api keys and omits null optionals", () => {
    const input = [
      {
        id: "k1",
        user_id: "u1",
        key_hash: "hash",
        key_prefix: "kota_1234",
        name: null,
        last_used_at: null,
        created_at: new Date().toISOString(),
        revoked_at: null,
      },
    ];
    const out = validateApiKeys(input);
    expect(out).toHaveLength(1);
    const key = out[0]!;
    expect("name" in key).toBe(false);
    expect("last_used_at" in key).toBe(false);
    expect("revoked_at" in key).toBe(false);
  });

  it("parses usage metrics and preserves strings for numeric fields", () => {
    const input = [
      {
        id: "m1",
        user_id: "u1",
        date: new Date().toISOString(),
        queries_count: 10,
        context_saved_mb: "12.34",
        storage_used_mb: "56.78",
        created_at: new Date().toISOString(),
      },
    ];
    const out = validateUsageMetrics(input);
    const m = out[0]!;
    expect(m.context_saved_mb).toBe("12.34");
    expect(m.storage_used_mb).toBe("56.78");
  });
});
