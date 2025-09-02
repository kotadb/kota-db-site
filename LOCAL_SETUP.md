# Local Development Setup

This guide helps you set up a 100% local development environment for KotaDB with Supabase.

## Prerequisites

- Docker Desktop installed and running
- Node.js (check `.nvmrc` for version)
- pnpm package manager
- Supabase CLI (installed via `brew install supabase/tap/supabase`)

## Quick Start

### 1. Start Local Supabase

```bash
# Start Supabase services (requires Docker)
supabase start

# This will output your local credentials:
# - API URL: http://localhost:54321
# - DB URL: postgresql://postgres:postgres@localhost:54322/postgres
# - Studio URL: http://localhost:54323
# - Inbucket URL: http://localhost:54324 (email testing)
# - Anon key: [will be displayed]
# - Service key: [will be displayed]
```

### 2. Configure Authentication (Optional)

For GitHub OAuth to work locally:

1. Create a GitHub OAuth App at https://github.com/settings/applications/new
   - Application name: `KotaDB Local`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:54321/auth/v1/callback`

2. Add credentials to `supabase/.env`:

```bash
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

3. Restart Supabase to load the credentials:

```bash
supabase stop
supabase start
```

### 3. Start Development Servers

```bash
# Terminal 1: Start the main web app (port 3000)
cd apps/web
pnpm dev

# Terminal 2: Start the dashboard app (port 3001)
cd apps/app
pnpm dev
```

### 4. Access Local Services

- **Main Site**: http://localhost:3000
- **Dashboard**: http://localhost:3001
- **Supabase Studio**: http://localhost:54323 (database management UI)
- **Inbucket**: http://localhost:54324 (view test emails)

## Local Authentication Options

### Option 1: Email/Password (Simplest)

1. Visit http://localhost:54323 (Supabase Studio)
2. Go to Authentication → Users
3. Click "Add user" → Create a new user
4. Use those credentials to log in

### Option 2: GitHub OAuth

Follow the "Configure Authentication" steps above to set up GitHub OAuth.

### Option 3: Magic Link (Email)

1. Sign up with any email
2. Check http://localhost:54324 (Inbucket) for the magic link
3. Click the link to authenticate

## Environment Variables

The apps are configured to automatically use local Supabase when running on localhost. The `.env.local` files are already configured with:

- `NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=[local anon key]`

## Database Setup

If you need to set up database tables:

1. Visit http://localhost:54323 (Supabase Studio)
2. Use the SQL editor to create your tables
3. Or place migration files in `supabase/migrations/`

## Troubleshooting

### Docker not running

```bash
# Make sure Docker Desktop is running
open -a Docker
```

### Port conflicts

If you get port conflicts, stop other Supabase projects:

```bash
supabase stop --all
```

### Reset local database

```bash
supabase db reset
```

### View Supabase logs

```bash
supabase logs
```

## Useful Commands

```bash
# Check Supabase status
supabase status

# Stop Supabase
supabase stop

# Reset database
supabase db reset

# Run migrations
supabase migration up

# Create a new migration
supabase migration new your_migration_name
```
