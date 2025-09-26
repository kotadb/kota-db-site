# KotaDB SaaS Frontend Integration Guide

> _Status_: Draft guidance for connecting the KotaDB SaaS frontend (Next.js on Cloudflare Pages) with the managed backend on Fly.io, shared Supabase data, and Stripe billing. Updated to reflect today’s schema and note upcoming backend-driven changes.

## 1. Architecture Overview

```
+----------------------+       +-----------------------+       +-----------------------+
|  Next.js Frontend    |       |  Fly.io KotaDB API    |       |        Stripe         |
|  (Cloudflare Pages)  |       |  (Stateless worker)   |       |  Checkout + Webhooks  |
|                      |       |                       |       |                       |
|  - Supabase auth     |<----->|  - Repo ingest (roadmap)      |  - Subscription flow  |
|  - Supabase queries  |       |  - MCP + rate limits  |       |  - Billing events     |
|  - Stripe Checkout   |       |  - Provisioning queue |       |                       |
+----------^-----------+       +-----------^-----------+       +-----------^-----------+
           |                               |                               |
           | direct auth + tables          | service-role writes           |
           |                               |                               |
           v                               v                               v
   +-----------------+           +-----------------------+       +-----------------------+
   | Supabase Auth   |           | Supabase Postgres     |       | Stripe Webhook Route  |
   | (Hosted)        |           | (Current SaaS tables) |<------| (Next.js Edge API)    |
   +-----------------+           +-----------------------+       +-----------------------+
```

## 2. Supabase Integration

### 2.1 Client Access Pattern (Current)

- Marketing and dashboard apps memoise a browser-only Supabase client ([apps/app/src/lib/supabase.ts](../apps/app/src/lib/supabase.ts#L1)). This remains the recommended approach until we revisit Cloudflare-compatible helpers.
- Login flows use `getSupabase().auth.*` for email/password and GitHub OAuth (see [apps/app/src/app/login/page.tsx](../apps/app/src/app/login/page.tsx#L20)).
- Components read/write Supabase tables directly via `.from(...)` calls (e.g. [apps/app/src/components/RepositoryList.tsx](../apps/app/src/components/RepositoryList.tsx#L48)).

### 2.2 Tables Available Today

Type definitions in `packages/shared/src/types/database.ts` reflect the current shape:

| Table           | Key Fields (frontend access)                                              | Notes                                                                   |
| --------------- | ------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `users`         | `email`, `stripe_customer_id`, `subscription_status`, `subscription_plan` | Updated by Stripe webhook via service role key.                         |
| `repositories`  | `github_url`, `name`, `status`, `error_message`, `indexed_at`             | Inserts currently originate from the dashboard UI.                      |
| `api_keys`      | `key_hash`, `key_prefix`, `name`, `revoked_at`                            | Dashboard can create/delete keys; long term this will move server-side. |
| `usage_metrics` | `queries_count`, `context_saved_mb`, `storage_used_mb`                    | Placeholder metrics surfaced in dashboard charts.                       |

### 2.3 Recommended Queries (Current State)

- **Repositories**: `supabase.from("repositories").select("id, name, github_url, status, indexed_at, error_message")` filtered by `user_id`. Do not attempt to manage backend-owned lifecycle states yet.
- **API Keys**: Existing UI creates keys with `supabase.from("api_keys").insert(...)`. Treat this as _legacy_ behaviour that will be deprecated once backend provisioning lands; avoid building new features on top of client-generated secrets.
- **Usage Metrics**: Query `usage_metrics` directly for charts. Expect the schema to evolve—keep rendering logic defensive around missing values.

### 2.4 Roadmap: Backend-Owned Schema

The backend team is introducing additional Supabase tables/columns (e.g. repository Git URLs, sync states, job queues, token usage). Once migrations land in this repo, we will:

- Update `packages/shared` types to include fields such as `git_url`, `sync_state`, `last_indexed_at`, and new `token_usage` aggregates.
- Shift repository onboarding and API key creation to backend services using Supabase service-role credentials.
- Document the corresponding Supabase migrations here to keep frontend guidance in sync.

## 3. Stripe Subscription Flow

### 3.1 Current Implementation

- Pricing page hits `/api/stripe/checkout` to create a session with `priceId`, `plan`, and `email` ([apps/web/src/app/api/stripe/checkout/route.ts](../apps/web/src/app/api/stripe/checkout/route.ts#L6)). Email capture still relies on Stripe—Front-end TODO is to pass the collected address through the request body.
- `/api/stripe/webhook` (Edge runtime) verifies signatures and updates the `users` table via service-role credentials ([apps/web/src/app/api/stripe/webhook/route.ts](../apps/web/src/app/api/stripe/webhook/route.ts#L16)).
- The dashboard “Billing” button simply opens Stripe’s customer portal; `/onboarding` remains unimplemented.

### 3.2 Target Provisioning Flow

1. **Checkout Success (Frontend)**: After redirect to `/onboarding?session_id=...`, the frontend must raise a provisioning request to the backend—_do not_ mint Supabase API keys or repositories directly in the browser. Enqueue by calling a secured endpoint (e.g. `POST https://<saas-api>/internal/provision`) with the Stripe session ID.
2. **Backend Job (Fly API / Worker)**: Using service-role credentials and the Stripe secret key, the backend:
   - Validates the session and pulls metadata (`plan`, `customer`, email).
   - Seeds Supabase records (API key table, repository placeholders, quota scaffolding) and schedules any background indexing jobs.
   - Implements idempotency so retries are safe.
3. **Status Feedback**: Frontend polls a lightweight status endpoint or Supabase view to unlock dashboard features once provisioning is complete.
4. **Webhook Cohesion**: The existing webhook already runs with privileged credentials; the provisioning job should share that context to keep secrets server-side.

> This path keeps all privileged writes in backend infrastructure, aligns with retry/fan-out needs, and avoids leaking service-role credentials to the browser.

## 4. KotaDB API Touchpoints

- An unused `ApiClientFactory` lives in [apps/web/src/lib/factories/api-client.factory.ts](../apps/web/src/lib/factories/api-client.factory.ts#L1). Repurpose it when backend endpoints are ready, or remove it to avoid confusion.
- Once the SaaS API exposes repository and MCP routes, prefer proxying through Next.js API routes so you can inject tenant API keys retrieved from Supabase.
- Today the dashboard has no direct dependency on the KotaDB Fly API; plan for integration after provisioning orchestration stabilises.

## 5. Environment Configuration

Strictly use placeholders in docs and keep sensitive values in Secrets.

| Variable                             | Description                          | Staging Placeholder                     | Production Placeholder               |
| ------------------------------------ | ------------------------------------ | --------------------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_SUPABASE_URL`           | Supabase project URL                 | `https://<develop-project>.supabase.co` | `https://<prod-project>.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`      | Supabase anon key                    | `sb_develop_anon_...`                   | `sb_prod_anon_...`                   |
| `SUPABASE_SERVICE_ROLE_KEY`          | Supabase service role (backend only) | stored as GitHub secret                 | stored as GitHub secret              |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key               | `pk_test_...`                           | `pk_live_...`                        |
| `STRIPE_SECRET_KEY`                  | Stripe secret (backend only)         | `sk_test_...`                           | `sk_live_...`                        |
| `STRIPE_WEBHOOK_SECRET`              | Checkout webhook signing secret      | `whsec_test_...`                        | `whsec_live_...`                     |
| `NEXT_PUBLIC_STRIPE_SOLO_PRICE_ID`   | Solo plan price ID                   | `price_test_solo`                       | `price_live_solo`                    |
| `NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID`   | Team plan price ID                   | `price_test_team`                       | `price_live_team`                    |
| `NEXT_PUBLIC_APP_URL`                | Marketing site URL                   | `https://develop.kotadb.io`             | `https://kotadb.io`                  |
| `NEXT_PUBLIC_DASHBOARD_URL`          | Dashboard URL                        | `https://app.develop.kotadb.io`         | `https://app.kotadb.io`              |

### 5.1 Sample `.env.local`

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://<project>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sb_anon_placeholder"
SUPABASE_SERVICE_ROLE_KEY="srv_role_placeholder" # Do not expose in client bundles

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_placeholder"
STRIPE_SECRET_KEY="sk_test_placeholder"
STRIPE_WEBHOOK_SECRET="whsec_test_placeholder"
NEXT_PUBLIC_STRIPE_SOLO_PRICE_ID="price_test_solo"
NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID="price_test_team"

# GitHub OAuth
GITHUB_CLIENT_ID="github_client_placeholder"
GITHUB_CLIENT_SECRET="github_secret_placeholder"

# App URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_DASHBOARD_URL="http://localhost:3001"
```

## 6. Cloudflare Pages Deployment

- Both apps build via `@cloudflare/next-on-pages`, emitting `.vercel/output/static` (see [apps/web/wrangler.toml](../apps/web/wrangler.toml#L1) and [apps/app/wrangler.toml](../apps/app/wrangler.toml#L1)).
- GitHub Actions workflows (`deploy-develop.yml`, `deploy-production.yml`) inject environment-specific secrets; use `wrangler secret put` for runtime-only values.
- Preview deployments inherit develop secrets; production publishes from `main`.

### Deployment Checklist

1. Populate GitHub secrets (Stripe webhook, GitHub OAuth keys) before relying on them.
2. Run local dev with `pnpm --filter apps/web dev` or `pnpm --filter apps/app dev` using the `.env.local` template above.
3. Ensure Stripe webhook endpoint points at the deployed marketing API route.
4. Once backend provisioning is available, complete a Stripe test checkout and verify provisioning status before promoting to production.
5. Use Playwright smoke tests (`ci/playwright-smoke-tests` branch) to exercise auth → checkout → dashboard happy path.

## 7. Outstanding Workstreams

- **Backend provisioning API**: Define the request shape (likely `session_id`, optional plan override) and auth expectations so the onboarding page can integrate.
- **Schema updates**: Coordinate with backend to publish Supabase migrations in this repo and refresh `packages/shared` types accordingly.
- **Dashboard UX**: Replace legacy client-side API key creation once backend-managed keys exist; the current insert flow should be treated as transitional.
- **Stripe metadata**: Forward collected email from the pricing form into the checkout request to improve downstream reconciliation.
- **Auth enhancements**: When Cloudflare-compatible session helpers become viable, revisit adopting `@supabase/auth-helpers-nextjs`.

Use this guide as the shared source of truth between frontend and backend teams until the SaaS provisioning work is fully automated.
