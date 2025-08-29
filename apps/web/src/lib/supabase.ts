import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env["NEXT_PUBLIC_SUPABASE_URL"] ||
  "https://mnppfnyhvgohhblhcgbq.supabase.co";
const supabaseAnonKey =
  process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"] ||
  "sb_publishable_D_bO4NrPnDbjQpL7duDTpA_eUpPV-nC";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
