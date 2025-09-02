#!/bin/bash

echo "🚀 Starting KotaDB Local Development Environment"
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

# Start Supabase
echo "Starting Supabase..."
supabase start

if [ $? -ne 0 ]; then
    echo "❌ Failed to start Supabase. Try running 'supabase stop' first."
    exit 1
fi

echo ""
echo "✅ Supabase is running!"
echo ""
echo "📝 Local Services:"
echo "  • Supabase Studio: http://localhost:54323"
echo "  • API: http://localhost:54321"
echo "  • Database: postgresql://postgres:postgres@localhost:54322/postgres"
echo "  • Email Testing: http://localhost:54324"
echo ""
echo "🌐 Next, start your apps:"
echo "  • Main site: cd apps/web && pnpm dev (port 3000)"
echo "  • Dashboard: cd apps/app && pnpm dev (port 3001)"
echo ""
echo "📚 For GitHub OAuth (optional):"
echo "  1. Create GitHub OAuth app at https://github.com/settings/applications/new"
echo "  2. Add credentials to supabase/.env"
echo "  3. Restart with 'supabase stop && supabase start'"
echo ""
echo "🔐 Quick login options:"
echo "  1. Create user in Supabase Studio (http://localhost:54323)"
echo "  2. Use magic link and check Inbucket (http://localhost:54324)"