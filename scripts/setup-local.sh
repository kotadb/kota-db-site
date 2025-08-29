#!/bin/bash

# KotaDB Local Development Setup Script

set -e

echo "🚀 Setting up KotaDB local development environment..."

# Check prerequisites
command -v pnpm >/dev/null 2>&1 || { echo "❌ pnpm is required. Install it with: npm install -g pnpm"; exit 1; }
command -v docker >/dev/null 2>&1 || { echo "❌ Docker is required. Please install Docker Desktop."; exit 1; }

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Check for .env file
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update .env with your actual keys:"
    echo "   - Supabase keys"
    echo "   - Stripe keys"
    echo "   - GitHub OAuth credentials"
fi

# Start Supabase
echo "🗄️  Starting Supabase..."
if command -v supabase >/dev/null 2>&1; then
    supabase start
else
    echo "📥 Installing Supabase CLI..."
    brew install supabase/tap/supabase || {
        echo "Please install Supabase CLI manually: https://supabase.com/docs/guides/cli"
    }
fi

# Setup Stripe CLI for webhook testing
echo "💳 Setting up Stripe CLI..."
if ! command -v stripe >/dev/null 2>&1; then
    echo "📥 Installing Stripe CLI..."
    brew install stripe/stripe-cli/stripe || {
        echo "Please install Stripe CLI manually: https://stripe.com/docs/stripe-cli"
    }
fi

echo "
✅ Local development setup complete!

Next steps:
1. Update your .env file with the required keys
2. Run database migrations: supabase db push
3. Start the development servers:
   - Marketing site: pnpm dev:web (http://localhost:3000)
   - Dashboard: pnpm dev:app (http://localhost:3001)
4. Forward Stripe webhooks: stripe listen --forward-to localhost:3000/api/stripe/webhook

For more information, check the README.md
"