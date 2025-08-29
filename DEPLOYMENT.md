# KotaDB Deployment Guide

## Current Status

✅ **Deployed to Cloudflare Pages**

- Marketing site: https://kotadb-web.pages.dev
- Branch preview: https://develop.kotadb-web.pages.dev

✅ **GitHub Actions CI/CD**

- Automated deployments on push to `main`
- Preview deployments for pull requests
- All secrets configured (except Cloudflare API token)

## Required Manual Setup

### 1. Create Cloudflare API Token

1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Use "Custom token" template with:
   - **Permissions**:
     - Account: Cloudflare Pages:Edit
     - Zone: Page Rules:Edit (if using custom domain)
   - **Account Resources**: Include → Your account (Jaymin West)
   - **Zone Resources**: Include → Specific zone → kotadb.io (if you have the domain)
4. Create token and copy it
5. Add to GitHub secrets:
   ```bash
   gh secret set CLOUDFLARE_API_TOKEN --repo jayminwest/kota-db-site
   ```

### 2. Configure Custom Domain (kotadb.io)

#### In Cloudflare Dashboard:

1. Go to Pages → kotadb-web → Custom domains
2. Add domain: `kotadb.io`
3. Add domain: `www.kotadb.io`
4. Follow DNS configuration:
   - Add CNAME record: `kotadb.io` → `kotadb-web.pages.dev`
   - Add CNAME record: `www` → `kotadb-web.pages.dev`

### 3. Create Stripe Products

1. Go to https://dashboard.stripe.com/products
2. Create "Solo" product ($39/month)
3. Create "Team" product ($59/month)
4. Update GitHub secrets with price IDs:
   ```bash
   gh secret set NEXT_PUBLIC_STRIPE_SOLO_PRICE_ID --repo jayminwest/kota-db-site
   gh secret set NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID --repo jayminwest/kota-db-site
   ```

### 4. Set up Stripe Webhook

1. Go to https://dashboard.stripe.com/webhooks
2. Add endpoint: `https://kotadb.io/api/stripe/webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copy signing secret and update:
   ```bash
   gh secret set STRIPE_WEBHOOK_SECRET --repo jayminwest/kota-db-site
   ```

### 5. Configure GitHub OAuth App

1. Go to https://github.com/settings/developers
2. Create new OAuth App:
   - **Application name**: KotaDB
   - **Homepage URL**: https://kotadb.io
   - **Authorization callback**: https://mnppfnyhvgohhblhcgbq.supabase.co/auth/v1/callback
3. Update GitHub secrets:
   ```bash
   gh secret set GITHUB_CLIENT_ID --repo jayminwest/kota-db-site
   gh secret set GITHUB_CLIENT_SECRET --repo jayminwest/kota-db-site
   ```

## Deployment Commands

### Manual Deployment

```bash
# Deploy marketing site
cd apps/web
pnpm run build
pnpm run build:cf
wrangler pages deploy .vercel/output/static --project-name kotadb-web

# Deploy dashboard (when ready)
cd apps/app
pnpm run build
wrangler pages deploy .next --project-name kotadb-app
```

### Automatic Deployment

Simply push to the `main` branch:

```bash
git add .
git commit -m "feat: update site"
git push origin main
```

## Environment Variables

### Production URLs

- Marketing: https://kotadb.io
- Dashboard: https://app.kotadb.io (needs separate deployment)
- API endpoints: https://kotadb.io/api/*

### Current Secrets in GitHub

✅ Configured:

- `CLOUDFLARE_ACCOUNT_ID`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`

❌ Needs Configuration:

- `CLOUDFLARE_API_TOKEN` (create in Cloudflare dashboard)
- `GITHUB_CLIENT_ID` (create OAuth app)
- `GITHUB_CLIENT_SECRET` (create OAuth app)
- `STRIPE_WEBHOOK_SECRET` (create webhook endpoint)
- `NEXT_PUBLIC_STRIPE_SOLO_PRICE_ID` (create product)
- `NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID` (create product)

## Monitoring

- **Cloudflare Pages**: https://dash.cloudflare.com/pages
- **GitHub Actions**: https://github.com/jayminwest/kota-db-site/actions
- **Supabase Dashboard**: https://app.supabase.com/project/mnppfnyhvgohhblhcgbq
- **Stripe Dashboard**: https://dashboard.stripe.com

## Troubleshooting

### Build Failures

- Check GitHub Actions logs
- Ensure all secrets are properly set
- Verify Node.js version compatibility

### Domain Not Working

- Verify DNS records in Cloudflare
- Check SSL certificate status
- Wait for DNS propagation (can take up to 48 hours)

### Authentication Issues

- Verify GitHub OAuth callback URL
- Check Supabase authentication settings
- Ensure environment variables are correct

## Next Steps

1. ✅ Deploy marketing site to kotadb.io
2. ⏳ Configure custom domain DNS
3. ⏳ Create Stripe products
4. ⏳ Set up GitHub OAuth
5. ⏳ Deploy dashboard to app.kotadb.io
6. ⏳ Set up monitoring and analytics
