"use client";

import { useState } from "react";

export type PricingPlan = {
  id: string;
  name: string;
  price: number;
  cta: string;
  features: string[];
  priceId?: string;
  popular?: boolean;
  isFree?: boolean;
};

interface PricingPlansProps {
  plans: PricingPlan[];
  dashboardUrl: string;
}

export function PricingPlans({ plans, dashboardUrl }: PricingPlansProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (plan: PricingPlan) => {
    setLoading(plan.id);

    try {
      if (plan.isFree) {
        window.location.href = `${dashboardUrl}/login`;
        return;
      }

      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: plan.priceId,
          plan: plan.id,
          email: "",
        }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={`relative bg-[var(--card-bg)] rounded-2xl p-8 border ${
            plan.popular
              ? "border-[var(--accent)] shadow-2xl scale-105"
              : "border-[var(--border)] shadow-lg"
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-[var(--accent)] text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>
          )}

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">
              {plan.name}
            </h2>
            <div className="flex items-baseline justify-center">
              {plan.isFree ? (
                <span className="text-4xl font-bold text-[var(--accent)]">
                  Free
                </span>
              ) : (
                <>
                  <span className="text-5xl font-bold text-[var(--foreground)]">
                    ${plan.price}
                  </span>
                  <span className="text-[var(--foreground-secondary)] ml-2">
                    {plan.id === "team" ? "/seat/month" : "/month"}
                  </span>
                </>
              )}
            </div>
          </div>

          <ul className="space-y-4 mb-8 text-left text-[var(--foreground-secondary)]">
            {plan.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <button
            onClick={() => handleCheckout(plan)}
            disabled={loading === plan.id}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
              plan.popular || plan.isFree
                ? "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shadow-lg hover:shadow-xl"
                : "bg-[var(--button-secondary-bg)] hover:bg-[var(--button-secondary-hover)] text-[var(--button-secondary-text)]"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading === plan.id ? "Processing..." : plan.cta}
          </button>
        </div>
      ))}
    </div>
  );
}
