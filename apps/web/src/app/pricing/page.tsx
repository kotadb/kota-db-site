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
    "Start free, then upgrade to Individual or Team tiers when you’re ready to power every coding agent with hosted intelligence.",
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
      "Placeholder: Index one repository",
      "Placeholder: Starter agent queries",
      "Placeholder: Hosted knowledge graph basics",
      "Placeholder: Community support",
    ],
    cta: "Start Free",
    isFree: true,
  },
  {
    id: "solo",
    name: "Individual",
    price: 39,
    features: [
      "Hosted knowledge graph for solo builders",
      "10,000 agent queries per month",
      "CLI, REST, and MCP access",
      "Managed API key with quota controls",
      "Email support",
      "Placeholder: Managed analytics (coming soon)",
    ],
    cta: "Start Individual Plan",
    popular: true,
    ...(soloPriceId ? { priceId: soloPriceId } : {}),
  },
  {
    id: "team",
    name: "Team",
    price: 59,
    features: [
      "Everything in Individual",
      "Adaptive query quotas for teams",
      "Seat-based workspaces with shared context",
      "Priority support and onboarding",
      "Unlimited API keys per workspace",
      "Placeholder: Shared analytics dashboard (coming soon)",
      "Placeholder: Policy management (coming soon)",
    ],
    cta: "Start Team Plan",
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
          title="Choose your KotaDB SaaS plan"
          subtitle="Hosted intelligence for Claude and Codex workflows, ready when your agents are."
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
