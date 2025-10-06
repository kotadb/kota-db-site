# KotaDB Web Platform

A complete SaaS platform for KotaDB with authentication, payments, and dashboard.

## Architecture

This monorepo contains:

- **apps/web**: Marketing site and API (kotadb.io)
- **apps/app**: Dashboard application (app.kotadb.io)
- **packages/shared**: Shared types and utilities
- **supabase**: Database schema and migrations

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with GitHub OAuth
- **Payments**: Stripe (Subscriptions & Customer Portal)
- **Styling**: Tailwind CSS v4
- **Type Safety**: TypeScript with strict mode
- **Package Manager**: pnpm workspaces

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm (`npm install -g pnpm`)
- Docker Desktop
- Supabase CLI
- Stripe CLI (for webhook testing)

### Setup

1. **Clone and install dependencies:**

```bash
git clone <repo>
cd kota-db-site
pnpm install
```

2. **Run the setup script:**

```bash
./scripts/setup-local.sh
```

3. **Configure environment variables:**

```bash
cp .env.example .env
# Edit .env with your actual keys
```

### Required Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<from-supabase-start>
SUPABASE_SERVICE_ROLE_KEY=<from-supabase-start>

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_SOLO_PRICE_ID=price_...
NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID=price_...

# GitHub OAuth
GITHUB_CLIENT_ID=<from-github-oauth-app>
GITHUB_CLIENT_SECRET=<from-github-oauth-app>

# URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DASHBOARD_URL=http://localhost:3001
```

### Local Development

1. **Start Supabase:**

```bash
supabase start
```

2. **Run database migrations:**

```bash
supabase db push
```

3. **Start development servers:**

```bash
# Start both apps
pnpm dev

# Or individually
pnpm dev:web  # Marketing site on http://localhost:3000
pnpm dev:app  # Dashboard on http://localhost:3001
```

4. **Test Stripe webhooks:**

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Setting Up Services

### Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Go to Settings → API to get your keys
3. Enable GitHub OAuth in Authentication → Providers
4. Run migrations: `supabase db push`

### Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Create two products in Test mode:
   - Solo Plan ($29/month)
   - Team Plan ($49/seat/month)
3. Get your API keys from Developers → API keys
4. Set up webhook endpoint for `/api/stripe/webhook`
5. Configure webhook to send these events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`

### GitHub OAuth Setup

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App:
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:54321/auth/v1/callback`
3. Copy the Client ID and Client Secret to your `.env`

## Database Schema

### Tables

- **users**: User profiles linked to auth.users
- **repositories**: GitHub repositories added by users
- **api_keys**: Hashed API keys for authentication
- **usage_metrics**: Daily usage tracking

### Key Features

- Row Level Security (RLS) enabled on all tables
- Automatic user profile creation on signup
- API keys are hashed before storage
- Usage metrics tracked daily per user

## API Endpoints

### Stripe Endpoints

- `POST /api/stripe/checkout`: Create checkout session
- `POST /api/stripe/webhook`: Handle Stripe webhooks

### Authentication Flow

1. User clicks "Sign up" on marketing site
2. Redirected to GitHub OAuth
3. After auth, redirected to Stripe Checkout
4. On successful payment, account is activated
5. User redirected to dashboard with API key generation

## Development Workflow

### Commands

```bash
# Quality checks
pnpm quality          # Run all checks
pnpm typecheck       # TypeScript checking
pnpm lint            # ESLint
pnpm format          # Prettier

# Testing
pnpm test            # Run tests
pnpm test:coverage   # Coverage report

# Building
pnpm build           # Build all apps
pnpm build:web       # Build marketing site
pnpm build:app       # Build dashboard
```

### Project Structure

```
kota-db-site/
├── apps/
│   ├── web/                 # Marketing site (kotadb.io)
│   │   ├── src/
│   │   │   ├── app/         # App router pages
│   │   │   ├── components/  # React components
│   │   │   └── lib/         # Utilities
│   │   └── package.json
│   └── app/                 # Dashboard (app.kotadb.io)
│       ├── src/
│       │   ├── app/         # App router pages
│       │   ├── components/  # React components
│       │   └── lib/         # Utilities
│       └── package.json
├── packages/
│   └── shared/              # Shared code
│       ├── src/
│       │   ├── types/       # TypeScript types
│       │   └── utils/       # Utilities
│       └── package.json
├── supabase/
│   ├── migrations/          # Database migrations
│   └── config.toml         # Supabase config
├── scripts/
│   └── setup-local.sh      # Setup script
├── pnpm-workspace.yaml     # Monorepo config
└── README.md
```

## Deployment

### Production Checklist

- [ ] Set production environment variables
- [ ] Configure custom domains
- [ ] Enable Supabase RLS policies
- [ ] Set up Stripe production keys
- [ ] Configure CORS for API access
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting
- [ ] Enable SSL certificates

### Deployment Platforms

- **Vercel**: Recommended for Next.js apps
- **Supabase**: Managed PostgreSQL
- **Stripe**: Production payment processing

## Security

- API keys are hashed using SHA-256
- Row Level Security enforced in database
- CORS configured for API endpoints
- Rate limiting on API key generation
- GitHub URL validation before accepting
- Subscription status checked on API access

## Troubleshooting

### Common Issues

1. **Supabase connection errors:**
   - Ensure Supabase is running: `supabase status`
   - Check your environment variables

2. **Stripe webhook failures:**
   - Verify webhook secret is correct
   - Check Stripe CLI is forwarding: `stripe listen`

3. **GitHub OAuth errors:**
   - Verify callback URL matches Supabase config
   - Check GitHub OAuth app settings

## License

MIT
