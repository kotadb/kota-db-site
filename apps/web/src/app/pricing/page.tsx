"use client";

import { useState } from "react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const plans = [
  {
    id: "solo",
    name: "Solo",
    price: 39,
    priceId: process.env["NEXT_PUBLIC_STRIPE_SOLO_PRICE_ID"],
    features: [
      "Unlimited repositories",
      "10,000 queries/month",
      "GitHub integration",
      "API access",
      "Email support",
      "1 API key",
    ],
    cta: "Start Solo Plan",
  },
  {
    id: "team",
    name: "Team",
    price: 59,
    priceId: process.env["NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID"],
    features: [
      "Everything in Solo",
      "Unlimited queries",
      "Team collaboration",
      "Priority support",
      "Advanced analytics",
      "5 API keys",
      "Custom integrations",
    ],
    cta: "Start Team Plan",
    popular: true,
  },
];

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (plan: (typeof plans)[0]) => {
    setLoading(plan.id);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: plan.priceId,
          plan: plan.id,
          email: "", // Will be collected during checkout
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-lg bg-white/80 dark:bg-slate-950/80 z-50 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 max-w-7xl mx-auto">
            <Link href="/" className="flex items-center">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-900 to-teal-600 dark:from-teal-400 dark:to-teal-200 bg-clip-text text-transparent">
                KotaDB
              </h1>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href={`${process.env["NEXT_PUBLIC_DASHBOARD_URL"] || "https://app.kotadb.io"}/login`}
                className="text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-all duration-200"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Choose the plan that fits your needs. Cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white dark:bg-slate-800 rounded-2xl p-8 border ${
                  plan.popular
                    ? "border-teal-500 shadow-2xl scale-105"
                    : "border-slate-200 dark:border-slate-700 shadow-lg"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50 mb-2">
                    {plan.name}
                  </h2>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-slate-900 dark:text-slate-50">
                      ${plan.price}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 ml-2">
                      /month
                    </span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-slate-700 dark:text-slate-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleCheckout(plan)}
                  disabled={loading === plan.id}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                    plan.popular
                      ? "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl"
                      : "bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white"
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading === plan.id ? "Processing..." : plan.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              All plans include a 14-day free trial. No credit card required to
              start.
            </p>
            <p className="text-sm text-slate-500">
              Need a custom plan?{" "}
              <a
                href="mailto:support@kotadb.io"
                className="text-teal-600 hover:text-teal-700"
              >
                Contact us
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
