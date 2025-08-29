#!/bin/bash

# Setup GitHub Secrets for KotaDB
# This script sets up all required secrets for GitHub Actions deployments

set -e

echo "🔐 Setting up GitHub Secrets for KotaDB..."

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed. Please install it first:"
    echo "   brew install gh"
    exit 1
fi

# Check if authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub. Please run: gh auth login"
    exit 1
fi

# Get repository name
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
echo "📦 Repository: $REPO"

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
    echo "✅ Loaded environment variables from .env"
else
    echo "❌ .env file not found"
    exit 1
fi

# Function to set secret
set_secret() {
    local name=$1
    local value=$2
    
    if [ -z "$value" ] || [ "$value" = "..." ] || [[ "$value" == *"your-"* ]]; then
        echo "⚠️  Skipping $name (not configured)"
        return
    fi
    
    echo "Setting $name..."
    echo "$value" | gh secret set "$name" --repo "$REPO"
    echo "✅ Set $name"
}

echo ""
echo "📝 Setting up secrets..."

# Supabase
set_secret "NEXT_PUBLIC_SUPABASE_URL" "$NEXT_PUBLIC_SUPABASE_URL"
set_secret "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$NEXT_PUBLIC_SUPABASE_ANON_KEY"
set_secret "SUPABASE_SERVICE_ROLE_KEY" "$SUPABASE_SERVICE_ROLE_KEY"

# Stripe
set_secret "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" "$NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
set_secret "STRIPE_SECRET_KEY" "$STRIPE_SECRET_KEY"
set_secret "STRIPE_WEBHOOK_SECRET" "$STRIPE_WEBHOOK_SECRET"
set_secret "NEXT_PUBLIC_STRIPE_SOLO_PRICE_ID" "$NEXT_PUBLIC_STRIPE_SOLO_PRICE_ID"
set_secret "NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID" "$NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID"

# GitHub OAuth
set_secret "GITHUB_CLIENT_ID" "$GITHUB_CLIENT_ID"
set_secret "GITHUB_CLIENT_SECRET" "$GITHUB_CLIENT_SECRET"

# Cloudflare
set_secret "CLOUDFLARE_ACCOUNT_ID" "d68e044bab0ac2c92681e24d3a9e94d0"

# Cloudflare API Token (needs to be created manually)
echo ""
echo "⚠️  IMPORTANT: You need to manually add these secrets:"
echo ""
echo "1. CLOUDFLARE_API_TOKEN"
echo "   - Go to https://dash.cloudflare.com/profile/api-tokens"
echo "   - Create a token with 'Cloudflare Pages:Edit' permission"
echo "   - Run: gh secret set CLOUDFLARE_API_TOKEN --repo $REPO"
echo ""
echo "2. Stripe Price IDs (after creating products in Stripe Dashboard)"
echo "   - NEXT_PUBLIC_STRIPE_SOLO_PRICE_ID"
echo "   - NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID"
echo ""
echo "3. Stripe Webhook Secret (after setting up webhook endpoint)"
echo "   - STRIPE_WEBHOOK_SECRET"
echo ""

echo "📊 Current secrets in repository:"
gh secret list --repo "$REPO"

echo ""
echo "✅ GitHub Secrets setup complete!"
echo ""
echo "Next steps:"
echo "1. Create Cloudflare API token and add it as a secret"
echo "2. Create Stripe products and add their price IDs"
echo "3. Set up Stripe webhook and add the webhook secret"
echo "4. Push to main branch to trigger deployment"