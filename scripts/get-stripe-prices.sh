#!/bin/bash

# Fetch Stripe Price IDs for products
# This uses the Stripe API directly with curl

# Use STRIPE_SECRET_KEY environment variable
STRIPE_KEY="${STRIPE_SECRET_KEY:-}"

if [ -z "$STRIPE_KEY" ]; then
  echo "❌ Error: STRIPE_SECRET_KEY environment variable is not set"
  echo "Please export STRIPE_SECRET_KEY=your_stripe_secret_key"
  exit 1
fi

echo "🔍 Fetching prices for your Stripe products..."
echo ""

# Fetch prices for Solo product
echo "Solo Product (prod_Sx5pghsXsumeGG):"
curl -s https://api.stripe.com/v1/prices \
  -u "$STRIPE_KEY:" \
  -d "product=prod_Sx5pghsXsumeGG" \
  -d "active=true" \
  | python3 -m json.tool | grep -E '"id"|"unit_amount"|"recurring"' | head -10

echo ""
echo "Team Product (prod_Sx5p2CgUCAUSSl):"
curl -s https://api.stripe.com/v1/prices \
  -u "$STRIPE_KEY:" \
  -d "product=prod_Sx5p2CgUCAUSSl" \
  -d "active=true" \
  | python3 -m json.tool | grep -E '"id"|"unit_amount"|"recurring"' | head -10

echo ""
echo "📝 Look for the 'id' field that starts with 'price_' - those are your price IDs"