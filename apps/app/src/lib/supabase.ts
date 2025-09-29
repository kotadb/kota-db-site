import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/* eslint-disable @typescript-eslint/no-explicit-any */
type GenericSupabaseClient = SupabaseClient<any, any>;
/* eslint-enable @typescript-eslint/no-explicit-any */

// Hardcoded fallback for Cloudflare Pages deployment. These are public keys.
const FALLBACK_SUPABASE_URL = "https://mnppfnyhvgohhblhcgbq.supabase.co";
const FALLBACK_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ucHBmbnloZ29oaGJsaGNnYnEiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczNDA3NzIyNiwiZXhwIjoyMDQ5NjUzMjI2fQ.5cQO65ZqEEB3LiYcJw7I4JTmPqUmrYKDDwLgGLPsJnI";

let supabaseClient: GenericSupabaseClient | null = null;
let fallbackClient: GenericSupabaseClient | null = null;

function createSupabaseFromEnv(): GenericSupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "Missing required environment variable: NEXT_PUBLIC_SUPABASE_URL",
    );
  }

  if (!supabaseAnonKey) {
    throw new Error(
      "Missing required environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

function getFallbackSupabase(): GenericSupabaseClient {
  if (fallbackClient) {
    return fallbackClient;
  }

  fallbackClient = createClient(
    FALLBACK_SUPABASE_URL,
    FALLBACK_SUPABASE_ANON_KEY,
  );
  return fallbackClient;
}

export function getSupabase(): GenericSupabaseClient {
  if (supabaseClient) {
    return supabaseClient;
  }

  supabaseClient = createSupabaseFromEnv();
  return supabaseClient;
}

export const supabase: GenericSupabaseClient = (() => {
  try {
    return getSupabase();
  } catch {
    return getFallbackSupabase();
  }
})();
