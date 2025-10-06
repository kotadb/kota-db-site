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
    price: 29,
    priceId: "",
    features: [
      "5 active codebases",
      "500MB indexed code",
      "Unlimited semantic queries",
      "Embedding-powered relevance ranking",
      "Email support",
    ],
  },
  team: {
    id: "team",
    name: "Team",
    price: 49,
    priceId: "",
    features: [
      "Everything in Solo",
      "Unlimited team codebases",
      "Shared team indexes",
      "Usage analytics & admin controls",
      "Priority Slack/Discord support",
      "SSO (phase 2)",
    ],
  },
};
