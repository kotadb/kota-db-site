# Coming Soon Page - Deployment Guide

## Overview

The pre-launch coming soon page is ready to deploy. All code has been committed to `develop` and PR #93 is open to `main`.

**PR**: https://github.com/kotadb/kota-db-site/pull/93

## Quick Deploy to Production

### Step 1: Merge the PR

```bash
# Review and merge PR #93
gh pr view 93 --web

# Or merge via CLI
gh pr merge 93 --squash
```

### Step 2: Set Environment Variable in Cloudflare Pages

Go to: https://dash.cloudflare.com → Pages → kotadb-web → Settings → Environment variables

**For Production environment**, add:

```
NEXT_PUBLIC_COMING_SOON_MODE=true
```

**For both apps** (kotadb-web and kotadb-app if applicable):

- Variable name: `NEXT_PUBLIC_COMING_SOON_MODE`
- Value: `true`
- Environment: Production

### Step 3: Deploy

Once merged to `main`, GitHub Actions will automatically deploy to Cloudflare Pages.

Monitor deployment:

- GitHub Actions: https://github.com/kotadb/kota-db-site/actions
- Cloudflare Pages: https://dash.cloudflare.com → Pages → kotadb-web

## What Happens When Live

### With Feature Flag Enabled (`NEXT_PUBLIC_COMING_SOON_MODE=true`):

- **kotadb.io** → Shows coming-soon page with manifesto
- **kotadb.io/pricing** → Redirects to coming-soon
- **kotadb.io/anything** → Redirects to coming-soon
- **app.kotadb.io** → Redirects to kotadb.io/coming-soon
- **API routes** → Still accessible (needed for waitlist signup)

### Waitlist Captures:

- Email address (validated)
- UTM parameters (utm_source, utm_medium, utm_campaign, utm_term, utm_content)
- IP address
- User agent
- Referrer
- Timestamp

All stored in Supabase `waitlist` table.

## View Waitlist Signups

### Via Supabase Dashboard:

1. Go to: https://app.supabase.com/project/mnppfnyhvgohhblhcgbq
2. Navigate to: Table Editor → waitlist
3. View all signups with full analytics

### Via SQL:

```sql
-- View recent signups
SELECT
  email,
  created_at,
  utm_source,
  utm_campaign,
  referrer
FROM waitlist
ORDER BY created_at DESC
LIMIT 100;

-- Count total signups
SELECT COUNT(*) as total_signups FROM waitlist;

-- Signups by source
SELECT
  utm_source,
  COUNT(*) as count
FROM waitlist
GROUP BY utm_source
ORDER BY count DESC;
```

## When Ready to Launch Full Site

### Option 1: Via Cloudflare Dashboard (Fastest)

1. Go to Cloudflare Pages → kotadb-web → Settings → Environment variables
2. Change `NEXT_PUBLIC_COMING_SOON_MODE` from `true` to `false`
3. Redeploy (Settings → Deployments → Redeploy latest)

### Option 2: Via Wrangler CLI

```bash
# Update environment variable
wrangler pages deployment tail --project-name=kotadb-web

# Trigger redeploy
cd apps/web
pnpm run build && pnpm run build:cf
pnpm run deploy:cf
```

### Option 3: Git Push (Slowest)

1. Make any small commit to `main`
2. GitHub Actions will auto-deploy with updated env var

## Testing Locally

### Test Coming Soon Mode:

```bash
# In apps/web/.env.local, set:
NEXT_PUBLIC_COMING_SOON_MODE=true

# Start dev server
pnpm dev:web

# Visit http://localhost:3000
# All routes should redirect to /coming-soon
```

### Test Waitlist Signup:

1. Go to http://localhost:3000/coming-soon
2. Enter email in form
3. Submit
4. Check Supabase table for entry

### Test Full Site Mode:

```bash
# In apps/web/.env.local, set:
NEXT_PUBLIC_COMING_SOON_MODE=false

# Restart dev server
pnpm dev:web

# Visit http://localhost:3000
# Should see normal landing page
```

## Monitoring

### Deployment Status:

- **GitHub Actions**: https://github.com/kotadb/kota-db-site/actions
- **Cloudflare Pages**: https://dash.cloudflare.com/pages

### Waitlist Analytics:

- **Supabase Dashboard**: https://app.supabase.com/project/mnppfnyhvgohhblhcgbq/editor

### Site Status:

- **Production**: https://kotadb.io
- **Staging**: https://develop.kotadb-web.pages.dev

## Rollback Plan

If something goes wrong:

### Immediate Rollback (Under 1 minute):

```bash
# In Cloudflare Pages
1. Go to Settings → Environment variables
2. Delete NEXT_PUBLIC_COMING_SOON_MODE variable
3. Redeploy latest deployment

# Or set to false
NEXT_PUBLIC_COMING_SOON_MODE=false
```

### Full Rollback (Under 5 minutes):

```bash
# Revert the merge commit on main
git checkout main
git revert HEAD
git push origin main

# GitHub Actions will auto-deploy the revert
```

## Environment Variable Reference

### Development (apps/web/.env.local):

```bash
NEXT_PUBLIC_COMING_SOON_MODE=false
```

### Staging (Cloudflare - develop branch):

```bash
NEXT_PUBLIC_COMING_SOON_MODE=false
```

### Production (Cloudflare - main branch):

```bash
NEXT_PUBLIC_COMING_SOON_MODE=true  # Enable coming soon page
```

## Troubleshooting

### Issue: Coming soon page not showing

**Check:**

1. Environment variable is set correctly in Cloudflare
2. Deployment completed successfully
3. Browser cache cleared (Cmd+Shift+R)

### Issue: Waitlist signup not working

**Check:**

1. Supabase credentials in Cloudflare environment variables
2. API route `/api/waitlist` is accessible
3. Network tab in browser for error details
4. Supabase RLS policies allow anonymous inserts

### Issue: App redirects not working

**Check:**

1. Both apps (web and app) have environment variable set
2. Middleware is deployed in both apps
3. DNS configuration for app.kotadb.io

## Support Checklist

Before going live, verify:

- [ ] PR #93 merged to main
- [ ] Environment variable set in Cloudflare
- [ ] Deployment completed successfully
- [ ] kotadb.io loads coming-soon page
- [ ] Waitlist form submits successfully
- [ ] Email captured in Supabase
- [ ] app.kotadb.io redirects properly
- [ ] UTM parameters tracked
- [ ] SSL certificate valid
- [ ] Mobile responsive

## Next Steps After Launch

1. Monitor waitlist signups in Supabase
2. Share kotadb.io on social media with UTM parameters
3. Track analytics via UTM sources
4. Plan email campaigns for waitlist
5. When ready: flip feature flag to launch full site

---

**Ready to launch?** Merge PR #93 and set the environment variable. Your coming soon page will be live in ~3 minutes.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
