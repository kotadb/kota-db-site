import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Lazily create Supabase client at runtime to avoid build-time env access
export function getSupabase(): SupabaseClient {
  const supabaseUrl = process.env["NEXT_PUBLIC_SUPABASE_URL"];
  const supabaseAnonKey = process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"];

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
