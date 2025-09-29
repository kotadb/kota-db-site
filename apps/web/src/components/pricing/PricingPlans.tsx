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
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleCheckout = async (plan: PricingPlan) => {
    setLoading(plan.id);
    setStatusMessage("Processing payment...");

    try {
      if (plan.isFree) {
        setStatusMessage("Redirecting to login...");
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
        setStatusMessage("Redirecting to checkout...");
        window.location.href = url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setStatusMessage("Failed to start checkout. Please try again.");
      alert("Failed to start checkout. Please try again.");
    } finally {
      setLoading(null);
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  return (
    <>
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {statusMessage}
      </div>
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative backdrop-blur-lg bg-[var(--card-bg)]/90 rounded-3xl p-8 sm:p-10 border transition-all duration-500 hover:-translate-y-2 focus-within:ring-2 focus-within:ring-[var(--accent)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--background)] ${
              plan.popular
                ? "border-[var(--accent)]/60 shadow-2xl scale-105 hover:shadow-3xl"
                : "border-[var(--border)]/40 shadow-xl hover:shadow-2xl hover:border-[var(--border)]"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="backdrop-blur-md bg-[var(--accent)] text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] mb-3 sm:mb-4 tracking-tight">
                {plan.name}
              </h2>
              <div className="flex items-baseline justify-center">
                {plan.isFree ? (
                  <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] bg-clip-text text-transparent">
                    Free
                  </span>
                ) : (
                  <>
                    <span className="text-5xl sm:text-6xl font-bold text-[var(--foreground)]">
                      ${plan.price}
                    </span>
                    <span className="text-[var(--foreground-secondary)] ml-2 text-sm sm:text-base">
                      {plan.id === "team" ? "/seat/month" : "/month"}
                    </span>
                  </>
                )}
              </div>
            </div>

            <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 text-left text-[var(--foreground-secondary)] text-sm sm:text-base">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-[var(--accent)] mt-1 font-bold flex-shrink-0">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout(plan)}
              disabled={loading === plan.id}
              className={`w-full py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                plan.popular || plan.isFree
                  ? "bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white shadow-lg hover:shadow-xl hover:-translate-y-1"
                  : "backdrop-blur-md bg-[var(--card-bg)]/60 hover:bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--border-hover)] text-[var(--foreground)] shadow-sm hover:shadow-lg hover:-translate-y-1"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading === plan.id ? "Processing..." : plan.cta}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
