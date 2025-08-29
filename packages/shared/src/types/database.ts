export interface User {
  id: string;
  email: string;
  github_username?: string;
  stripe_customer_id?: string;
  subscription_status:
    | "active"
    | "canceled"
    | "past_due"
    | "trialing"
    | "inactive";
  subscription_plan: "solo" | "team" | null;
  created_at: string;
  updated_at: string;
}

export interface Repository {
  id: string;
  user_id: string;
  github_url: string;
  name: string;
  status: "pending" | "indexing" | "complete" | "failed";
  error_message?: string;
  indexed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface ApiKey {
  id: string;
  user_id: string;
  key_hash: string;
  key_prefix: string; // First 8 chars for identification
  name?: string;
  last_used_at?: string;
  created_at: string;
  revoked_at?: string;
}

export interface UsageMetric {
  id: string;
  user_id: string;
  date: string;
  queries_count: number;
  context_saved_mb: string;
  storage_used_mb: string;
  created_at: string;
}
