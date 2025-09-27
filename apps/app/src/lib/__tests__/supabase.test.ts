// Use relative import to avoid Next.js path alias in test env
import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it, beforeEach, vi } from "vitest";

describe("getSupabase memoization", () => {
  beforeEach(() => {
    vi.resetModules();
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test_anon_key";
  });

  it("returns the same client instance on subsequent calls", async () => {
    const { getSupabase } = await import("../../lib/supabase");
    const a: SupabaseClient = getSupabase();
    const b: SupabaseClient = getSupabase();
    expect(a).toBe(b);
  });

  it("throws when required env vars are missing", async () => {
    vi.resetModules();
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const mod = await import("../../lib/supabase");
    expect(() => mod.getSupabase()).toThrow();
  });
});
