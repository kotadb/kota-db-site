 
/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_APP_URL?: string;
    NEXT_PUBLIC_API_URL?: string;
    NEXT_PUBLIC_DASHBOARD_URL?: string;
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?: string;
    NEXT_PUBLIC_STRIPE_SOLO_PRICE_ID?: string;
    NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID?: string;
    NEXT_PUBLIC_SUPABASE_URL?: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
    SUPABASE_SERVICE_ROLE_KEY?: string;
    STRIPE_SECRET_KEY?: string;
    STRIPE_WEBHOOK_SECRET?: string;
    DB_HOST?: string;
    DB_PORT?: string;
    DB_NAME?: string;
    DB_USER?: string;
    DB_PASSWORD?: string;
    LOG_LEVEL?: string;
    CORS_ORIGINS?: string;
    FEATURE_ANALYTICS?: string;
    FEATURE_DARK_MODE?: string;
    FEATURE_EXPERIMENTAL?: string;
    RATE_LIMIT_WINDOW_MS?: string;
    RATE_LIMIT_MAX_REQUESTS?: string;
    PORT?: string;
    HOST?: string;
  }
}
