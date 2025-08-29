#!/usr/bin/env node

// This script fetches the price IDs for your Stripe products
// Run: node scripts/get-stripe-prices.js

// eslint-disable-next-line @typescript-eslint/no-require-imports
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ Error: STRIPE_SECRET_KEY environment variable is not set");
  console.error("Please export STRIPE_SECRET_KEY=your_stripe_secret_key");
  process.exit(1);
}

async function getPrices() {
  try {
    console.log("🔍 Fetching Stripe prices...\n");

    // Fetch all prices
    const prices = await stripe.prices.list({
      limit: 100,
      expand: ["data.product"],
    });

    // Group by product
    const productPrices = {};

    for (const price of prices.data) {
      const product = price.product;
      if (typeof product === "object" && product.active) {
        if (!productPrices[product.id]) {
          productPrices[product.id] = {
            name: product.name,
            prices: [],
          };
        }

        productPrices[product.id].prices.push({
          id: price.id,
          amount: price.unit_amount / 100,
          currency: price.currency,
          interval: price.recurring?.interval,
          active: price.active,
        });
      }
    }

    // Display results
    console.log("📦 Products and Prices:\n");

    for (const [productId, data] of Object.entries(productPrices)) {
      console.log(`Product: ${data.name}`);
      console.log(`Product ID: ${productId}`);

      for (const price of data.prices) {
        if (price.active) {
          console.log(`  ✅ Price ID: ${price.id}`);
          console.log(
            `     Amount: $${price.amount}/${price.interval || "one-time"}`,
          );
          console.log("");
        }
      }
    }

    console.log("\n📝 Update your .env file with these price IDs:");
    console.log("NEXT_PUBLIC_STRIPE_SOLO_PRICE_ID=<price_id_for_$39_plan>");
    console.log("NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID=<price_id_for_$59_plan>");
  } catch (error) {
    console.error("❌ Error fetching prices:", error.message);
  }
}

getPrices();
