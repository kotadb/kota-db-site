export type SubscriptionPlan = "solo" | "team";

export interface PricingPlan {
  id: SubscriptionPlan;
  name: string;
  price: number;
  priceId: string; // Stripe price ID
  features: string[];
}

export const PRICING_PLANS: Record<SubscriptionPlan, PricingPlan> = {
  solo: {
    id: "solo",
    name: "Solo",
    price: 39,
    priceId: process.env.NEXT_PUBLIC_STRIPE_SOLO_PRICE_ID || "",
    features: [
      "Unlimited repositories",
      "10,000 queries/month",
      "GitHub integration",
      "API access",
      "Email support",
    ],
  },
  team: {
    id: "team",
    name: "Team",
    price: 59,
    priceId: process.env.NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID || "",
    features: [
      "Everything in Solo",
      "Unlimited queries",
      "Team collaboration",
      "Priority support",
      "Advanced analytics",
    ],
  },
};
