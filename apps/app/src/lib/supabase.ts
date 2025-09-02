import { createClient } from "@supabase/supabase-js";

// Use environment variables for Supabase configuration
// Falls back to production values for Cloudflare Pages deployment
const supabaseUrl =
  process.env["NEXT_PUBLIC_SUPABASE_URL"] ||
  "https://mnppfnyhvgohhblhcgbq.supabase.co";

const supabaseAnonKey =
  process.env["NEXT_PUBLIC_SUPABASE_ANON_KEY"] ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ucHBmbnloZ29oaGJsaGNnYnEiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczNDA3NzIyNiwiZXhwIjoyMDQ5NjUzMjI2fQ.5cQO65ZqEEB3LiYcJw7I4JTmPqUmrYKDDwLgGLPsJnI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
