import {
  GradientCallToAction,
  Section,
  SectionHeading,
  SiteFooter,
  SiteHeader,
} from "@/components/site";
import { createPageMetadata } from "@/lib/metadata";
import {
  PricingPlans,
  type PricingPlan,
} from "@/components/pricing/PricingPlans";

export const dynamic = "force-dynamic";

export const metadata = createPageMetadata({
  title: "Pricing",
  description:
    "Experience KotaDB’s codebase intelligence free, then upgrade to Solo or Team when you’re ready for semantic search and shared context.",
  path: "/pricing",
});

const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://app.kotadb.io";

const soloPriceId = process.env.NEXT_PUBLIC_STRIPE_SOLO_PRICE_ID;
const teamPriceId = process.env.NEXT_PUBLIC_STRIPE_TEAM_PRICE_ID;

const plans: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    features: [
      "Experience codebase intelligence with 1 active codebase",
      "50MB of indexed code with PiTER-powered structure understanding",
      "100 keyword and AST-based queries each month",
      "MCP server integration and basic context retrieval",
      "Community support to get you started",
    ],
    cta: "Start Free",
    isFree: true,
  },
  {
    id: "solo",
    name: "Solo",
    price: 29,
    features: [
      "5 active codebases with up to 500MB indexed",
      "Unlimited queries backed by semantic search",
      "Embedding-powered understanding with smart context ranking",
      "Priority indexing for faster repository refreshes",
      "Advanced query patterns to speed up deep dives",
      "Email support when you need a hand",
    ],
    cta: "Start Solo",
    popular: true,
    ...(soloPriceId ? { priceId: soloPriceId } : {}),
  },
  {
    id: "team",
    name: "Team",
    price: 49,
    features: [
      "Everything in Solo for each teammate",
      "Unlimited codebases with shared team indexes",
      "Team context libraries to capture reusable patterns",
      "Usage analytics dashboard and admin controls",
      "Slack or Discord priority support",
      "SSO available in phase two rollout",
    ],
    cta: "Start Team",
    ...(teamPriceId ? { priceId: teamPriceId } : {}),
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] overflow-x-hidden w-full">
      <SiteHeader />

      <Section
        variant="spacious"
        className="pt-36"
        containerClassName="max-w-6xl"
      >
        <SectionHeading
          title="Choose your KotaDB plan"
          subtitle="Start with free codebase intelligence, then unlock semantic search and shared context when you’re ready."
        />

        <PricingPlans plans={plans} dashboardUrl={DASHBOARD_URL} />

        <div className="mt-12 text-center space-y-4 max-w-3xl mx-auto">
          <p className="text-[var(--foreground-secondary)]">
            Every plan begins with a generous onboarding period—cancel anytime.
          </p>
          <p className="text-sm text-[var(--foreground-secondary)]/80">
            Need a custom plan?{" "}
            <a
              href="mailto:support@kotadb.io"
              className="text-teal-600 hover:text-teal-700"
            >
              Contact us
            </a>
          </p>
        </div>
      </Section>

      <GradientCallToAction
        title="Spin up KotaDB in minutes"
        description="Pick the plan that fits, invite your team, and hand your agents a hosted knowledge graph without the setup sprint."
        primaryCta={{
          label: "Start your workspace",
          href: `${DASHBOARD_URL}/login`,
        }}
        secondaryCtas={[
          {
            label: "Talk to us about custom plans",
            href: "mailto:support@kotadb.io",
          },
          {
            label: "Browse the code on GitHub",
            href: "https://github.com/kotadb/kota-db",
            external: true,
          },
        ]}
      />

      <SiteFooter />
    </div>
  );
}
