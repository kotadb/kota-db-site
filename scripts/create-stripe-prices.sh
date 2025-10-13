#!/bin/bash

# Create Stripe Prices for products

# Use STRIPE_SECRET_KEY environment variable
STRIPE_KEY="${STRIPE_SECRET_KEY:-}"

if [ -z "$STRIPE_KEY" ]; then
  echo "❌ Error: STRIPE_SECRET_KEY environment variable is not set"
  echo "Please export STRIPE_SECRET_KEY=your_stripe_secret_key"
  exit 1
fi

echo "💰 Creating prices for Stripe products..."
echo ""

# Create price for Solo product ($29/month)
echo "Creating Solo price ($29/month)..."
SOLO_PRICE=$(curl -s https://api.stripe.com/v1/prices \
  -u "$STRIPE_KEY:" \
  -d "product=prod_Sx5pghsXsumeGG" \
  -d "currency=usd" \
  -d "unit_amount=2900" \
  -d "recurring[interval]=month" \
  | python3 -c "import sys, json; print(json.load(sys.stdin).get('id', ''))")

echo "✅ Solo Price ID: $SOLO_PRICE"
echo ""

# Create price for Team product ($49/seat/month)
echo "Creating Team price ($49/seat/month)..."
TEAM_PRICE=$(curl -s https://api.stripe.com/v1/prices \
  -u "$STRIPE_KEY:" \
  -d "product=prod_Sx5p2CgUCAUSSl" \
  -d "currency=usd" \
  -d "unit_amount=4900" \
  -d "recurring[interval]=month" \
  | python3 -c "import sys, json; print(json.load(sys.stdin).get('id', ''))")

echo "✅ Team Price ID: $TEAM_PRICE"
echo ""

echo "📝 Updating GitHub Secrets..."
echo "$SOLO_PRICE" | gh secret set NEXT_PUBLIC_STRIPE_SOLO_PRICE_ID --repo jayminwest/kota-db-site
echo "$TEAM_PRICE" | gh secret set NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID --repo jayminwest/kota-db-site

echo ""
echo "✅ Done! Price IDs:"
echo "NEXT_PUBLIC_STRIPE_SOLO_PRICE_ID=$SOLO_PRICE"
echo "NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID=$TEAM_PRICE"
