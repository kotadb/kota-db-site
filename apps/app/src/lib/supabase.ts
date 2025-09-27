import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Memoized Supabase client to avoid multiple instances/listeners
let supabaseClient: SupabaseClient | null = null;

// Lazily create Supabase client at runtime to avoid build-time env access
export function getSupabase(): SupabaseClient {
  if (supabaseClient) return supabaseClient;

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

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseClient;
}
