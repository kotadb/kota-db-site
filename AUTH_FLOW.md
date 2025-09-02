# Authentication Flow

## Overview

KotaDB uses a dual-app architecture where authentication is handled by the dashboard app (`app.kotadb.io`) while the main marketing site (`kotadb.io`) redirects users there for login.

## Production Flow

### 1. Main Site (kotadb.io)

- Marketing pages, documentation, pricing
- **Login redirect**: `/login` → `https://app.kotadb.io/login`
- No authentication handled here

### 2. Dashboard App (app.kotadb.io)

- Full authentication flow
- Login page at `/login` with:
  - Email/password authentication
  - GitHub OAuth
- Dashboard at `/dashboard` (requires authentication)
- Uses production Supabase instance

## Local Development Flow

### 1. Main Site (localhost:3000)

- **Login redirect**: `/login` → `http://localhost:3001/login`
- Automatically detects local environment

### 2. Dashboard App (localhost:3001)

- Login page at `/login`
- Dashboard at `/dashboard`
- Uses local Supabase instance (localhost:54321)

## Environment Configuration

### Production

- **Main Site**: `https://kotadb.io`
- **Dashboard**: `https://app.kotadb.io`
- **Supabase**: Production instance (configured in environment)

### Local Development

- **Main Site**: `http://localhost:3000`
- **Dashboard**: `http://localhost:3001`
- **Supabase**: `http://localhost:54321`
- **Supabase Studio**: `http://localhost:54323`

## Authentication Methods

### 1. Email/Password

- Available in both local and production
- Direct sign in through Supabase Auth

### 2. GitHub OAuth

- Requires GitHub OAuth app configuration
- Production: Redirect to `https://app.kotadb.io`
- Local: Redirect to `http://localhost:3001`

## Session Management

- Sessions are stored in browser localStorage
- Sessions are **port-specific** in local development
- Authentication happens on the same domain as the dashboard
- No cross-origin session sharing issues

## Quick Start for Local Development

1. Start Supabase:

   ```bash
   supabase start
   ```

2. Create a test user in Supabase Studio (http://localhost:54323)

3. Start both apps:

   ```bash
   # Terminal 1
   cd apps/web && pnpm dev

   # Terminal 2
   cd apps/app && pnpm dev
   ```

4. Access:
   - Main site: http://localhost:3000
   - Login directly: http://localhost:3001/login
   - Dashboard: http://localhost:3001/dashboard (after login)

## Deployment Notes

- Main site and dashboard can be deployed independently
- Main site redirects ensure users always authenticate through app.kotadb.io
- Environment variables automatically configure the correct URLs
- No hardcoded production URLs in authentication flow
