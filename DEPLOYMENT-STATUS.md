# KotaDB Deployment Status

## ✅ Completed Setup

### GitHub Secrets (All Configured)

- ✅ `CLOUDFLARE_ACCOUNT_ID` - Jaymin West's account
- ✅ `CLOUDFLARE_API_TOKEN` - For automated deployments
- ✅ `NEXT_PUBLIC_SUPABASE_URL` - https://mnppfnyhvgohhblhcgbq.supabase.co
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public key configured
- ✅ `SUPABASE_SERVICE_ROLE_KEY` - Service role configured
- ✅ `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Live Stripe key
- ✅ `STRIPE_SECRET_KEY` - Live secret key
- ✅ `NEXT_PUBLIC_STRIPE_SOLO_PRICE_ID` - $39/month plan (price_1S1BhdLzNAwxIAfWLao6Bnyp)
- ✅ `NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID` - $59/month plan (price_1S1BhdLzNAwxIAfWctHz5EfB)
- ⚠️ `STRIPE_WEBHOOK_SECRET` - Needs webhook endpoint configuration
- ⚠️ `GITHUB_CLIENT_ID` - Needs OAuth app creation
- ⚠️ `GITHUB_CLIENT_SECRET` - Needs OAuth app creation

### Deployment Infrastructure

- ✅ Cloudflare Pages project created: `kotadb-web`
- ✅ GitHub Actions workflows configured
- ✅ Automated deployment on push to `main`
- ✅ Preview deployments for PRs

### Live URLs

- **Current Deployment**: https://kotadb-web.pages.dev
- **Branch Preview**: https://develop.kotadb-web.pages.dev
- **Target Domain**: kotadb.io (needs DNS configuration)

## 🔧 Remaining Tasks

### 1. Configure Custom Domain (5 minutes)

In Cloudflare Dashboard:

1. Go to Pages → kotadb-web → Custom domains
2. Add `kotadb.io` and `www.kotadb.io`
3. Update DNS records as instructed

### 2. Set Up Stripe Webhook (5 minutes)

1. Go to https://dashboard.stripe.com/webhooks
2. Add endpoint: `https://kotadb.io/api/stripe/webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copy signing secret and run:
   ```bash
   gh secret set STRIPE_WEBHOOK_SECRET --body "whsec_xxxxx" --repo jayminwest/kota-db-site
   ```

### 3. Create GitHub OAuth App (5 minutes)

1. Go to https://github.com/settings/developers
2. Create new OAuth App:
   - **Name**: KotaDB
   - **Homepage**: https://kotadb.io
   - **Callback**: https://mnppfnyhvgohhblhcgbq.supabase.co/auth/v1/callback
3. Update secrets:
   ```bash
   gh secret set GITHUB_CLIENT_ID --body "xxxxx" --repo jayminwest/kota-db-site
   gh secret set GITHUB_CLIENT_SECRET --body "xxxxx" --repo jayminwest/kota-db-site
   ```

## 🚀 Deployment Commands

### Automatic Deployment (Recommended)

```bash
git add .
git commit -m "feat: your changes"
git push origin main
```

GitHub Actions will automatically deploy to Cloudflare Pages.

### Manual Deployment

```bash
cd apps/web
pnpm run build && pnpm run build:cf
wrangler pages deploy .vercel/output/static --project-name kotadb-web
```

### View Deployment Status

- GitHub Actions: https://github.com/jayminwest/kota-db-site/actions
- Cloudflare Pages: https://dash.cloudflare.com/d68e044bab0ac2c92681e24d3a9e94d0/pages/view/kotadb-web

## 📊 Stripe Products Created

| Plan | Product ID          | Price ID                       | Amount    |
| ---- | ------------------- | ------------------------------ | --------- |
| Solo | prod_Sx5pghsXsumeGG | price_1S1BhdLzNAwxIAfWLao6Bnyp | $39/month |
| Team | prod_Sx5p2CgUCAUSSl | price_1S1BhdLzNAwxIAfWctHz5EfB | $59/month |

## 🔍 Testing

Once domain is configured:

1. Visit https://kotadb.io
2. Click "View Pricing"
3. Select a plan
4. Should redirect to Stripe Checkout
5. After payment, user created in Supabase
6. Redirects to dashboard at app.kotadb.io

## 📝 Notes

- Using **production** Stripe keys (live mode)
- Supabase instance: mnppfnyhvgohhblhcgbq
- Cloudflare account: Jaymin West (d68e044bab0ac2c92681e24d3a9e94d0)
- All secrets stored securely in GitHub
- Deployment triggered on push to `main` branch
