import { createClient } from "@supabase/supabase-js";

// Hardcoded for Cloudflare Pages deployment
// These are public keys, safe to expose
const supabaseUrl = "https://mnppfnyhvgohhblhcgbq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ucHBmbnloZ29oaGJsaGNnYnEiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczNDA3NzIyNiwiZXhwIjoyMDQ5NjUzMjI2fQ.5cQO65ZqEEB3LiYcJw7I4JTmPqUmrYKDDwLgGLPsJnI";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
