import Link from "next/link";
import {
  GradientCallToAction,
  Section,
  SectionHeading,
  SiteFooter,
  SiteHeader,
} from "@/components/site";
import { createPageMetadata } from "@/lib/metadata";

const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://app.kotadb.io";

export const metadata = createPageMetadata({
  title: "Hosted intelligence for coding agents",
  description:
    "KotaDB delivers a managed knowledge graph so Claude, Codex, and every coding agent stop guessing and start building with context.",
  path: "/",
});

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-roboto)] overflow-x-hidden w-full page-container">
      <SiteHeader />

      {/* Hero Section */}
      <section className="hero-section pt-36 pb-32 min-h-screen flex items-center px-4 sm:px-6 lg:px-8 relative w-full">
        <div className="w-full max-w-4xl mx-auto text-center space-y-8">
          {/* Floating badge */}
          <div className="inline-flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--border)] rounded-full px-4 py-2 text-sm text-[var(--foreground-secondary)] shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Managed for Claude + Codex
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--foreground)] leading-[1.1] tracking-tight">
            Hosted intelligence for
            <br />
            <span className="text-[var(--accent)]">
              coding agents that ship
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[var(--foreground-secondary)] max-w-2xl mx-auto leading-relaxed">
            KotaDB gives Claude Code and Codex a managed knowledge graph, so
            your team stops filling context windows with grep, find, or awk
            guesses.
          </p>

          {/* Launch CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Link
              href={`${DASHBOARD_URL}/login`}
              className="group bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Started
              <svg
                className="ml-2 w-4 h-4 inline-block group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
            <Link
              href="/pricing"
              className="bg-[var(--card-bg)] hover:bg-[var(--button-secondary-hover)] border border-[var(--border)] text-[var(--foreground)] px-8 py-4 rounded-2xl font-semibold transition-all duration-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
            >
              View Pricing
            </Link>
          </div>

          {/* Simple links */}
          <div className="flex items-center justify-center gap-6 pt-8 text-sm">
            <Link
              href="https://github.com/kotadb/kota-db"
              target="_blank"
              className="text-[var(--foreground-secondary)] hover:text-[var(--accent)] transition-colors duration-200 underline underline-offset-4"
            >
              Check out the code
            </Link>
            <Link
              href="https://github.com/kotadb/kota-db#quickstart"
              target="_blank"
              className="text-[var(--foreground-secondary)] hover:text-[var(--accent)] transition-colors duration-200 underline underline-offset-4"
            >
              Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <Section variant="spacious">
        <div className="w-full max-w-6xl mx-auto">
          <SectionHeading
            title="Three pillars. One hosted brain."
            subtitle="KotaDB keeps your agents grounded with live knowledge, governed access, and production-ready guardrails."
          />

          <div className="mt-16 grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Context Understanding */}
            <div className="group relative">
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-[var(--accent)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                  Hosted Knowledge Graph
                </h3>
                <p className="text-[var(--foreground-secondary)] leading-relaxed mb-6">
                  KotaDB ingests your repositories and feeds Claude and Codex
                  curated answers instead of manual spelunking.
                </p>
                <div className="text-sm text-[var(--accent)] font-medium">
                  Graph-aware responses →
                </div>
              </div>
            </div>

            {/* Zero Setup */}
            <div className="group relative">
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-[var(--accent)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                  Enterprise Controls
                </h3>
                <p className="text-[var(--foreground-secondary)] leading-relaxed mb-6">
                  API keys, rate limits, and team workspaces stay in sync across
                  every interface with the managed dashboard.
                </p>
                <div className="text-sm text-[var(--accent)] font-medium">
                  Govern usage in minutes →
                </div>
              </div>
            </div>

            {/* Enterprise Scale */}
            <div className="group relative">
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-[var(--accent)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                  High-Trust Operations
                </h3>
                <p className="text-[var(--foreground-secondary)] leading-relaxed mb-6">
                  Layered safety wrappers, WAL durability, and zero external
                  databases keep every answer steady.
                </p>
                <div className="text-sm text-[var(--accent)] font-medium">
                  Resilience baked in →
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Comparison Section */}
      <Section>
        <SectionHeading
          title="Before KotaDB vs. after KotaDB"
          subtitle="Swap the guesswork and context wrangling for hosted intelligence your agents can trust."
        />

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-red-200/70 dark:border-red-900/60 bg-[var(--card-bg)] p-10 shadow-lg">
            <span className="inline-flex items-center gap-2 rounded-full bg-red-500/10 text-red-600 dark:text-red-300 px-3 py-1 text-sm font-semibold">
              Before KotaDB
            </span>
            <ul className="mt-6 space-y-4 text-[var(--foreground-secondary)]">
              <li className="flex gap-3">
                <span className="mt-1 text-red-500">×</span>
                <span>
                  Hop between tabs hunting for the right files to paste.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 text-red-500">×</span>
                <span>
                  Dump grep/find/awk results into prompts and hope they stick.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 text-red-500">×</span>
                <span>
                  Explain dependency chains to every new agent session.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 text-red-500">×</span>
                <span>
                  Ship refactors while wondering which services you missed.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 text-red-500">×</span>
                <span>Trade release velocity for manual safety checks.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-[var(--accent)]/40 bg-[var(--card-bg)] p-10 shadow-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1 text-sm font-semibold">
              With KotaDB
            </span>
            <ul className="mt-6 space-y-4 text-[var(--foreground-secondary)]">
              <li className="flex gap-3">
                <span className="mt-1 text-[var(--accent)]">✓</span>
                <span>
                  Your repos stay indexed in a hosted, queryable knowledge
                  graph.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 text-[var(--accent)]">✓</span>
                <span>
                  Claude and Codex pull structured context with a single prompt.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 text-[var(--accent)]">✓</span>
                <span>
                  CLI, REST, and MCP share one service layer—answers never
                  drift.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 text-[var(--accent)]">✓</span>
                <span>Impact analysis shows what breaks before you merge.</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1 text-[var(--accent)]">✓</span>
                <span>
                  Quota, key, and tenant controls are baked into the managed
                  plane.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Manual vs Hosted */}
      <Section>
        <SectionHeading
          title="Manual context vs hosted intelligence"
          subtitle="See how conversations shift when your agents stop guessing and start pulling from a shared knowledge graph."
        />

        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-red-200/70 dark:border-red-900/60 bg-[var(--card-bg)] p-8 shadow-lg">
            <span className="inline-flex items-center gap-2 rounded-full bg-red-500/10 text-red-600 dark:text-red-300 px-3 py-1 text-sm font-semibold">
              Without KotaDB
            </span>
            <div className="mt-6 bg-red-500/5 border border-red-200/60 dark:border-red-900/40 rounded-2xl p-6 overflow-x-auto">
              <pre className="text-sm font-[family-name:var(--font-roboto-mono)] text-red-500/80 whitespace-pre">
                {`# Every request needs context first
human> "Where does invoice_total get set?"
human> *opens five tabs, runs grep, repeats the prompt*
agent> "Maybe here? need more detail."

# Impact checks become guesswork
human> "What breaks if I touch billing_handler?"
human> *maps the call tree manually*
agent> *shrugs in autocomplete*

# Half the sprint disappears into context handoffs`}
              </pre>
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--accent)]/40 bg-[var(--card-bg)] p-8 shadow-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1 text-sm font-semibold">
              With KotaDB
            </span>
            <div className="mt-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-2xl p-6 overflow-x-auto">
              <pre className="text-sm font-[family-name:var(--font-roboto-mono)] text-[var(--foreground-secondary)] whitespace-pre">
                {`# Claude and Codex stay grounded
claude> "Show callers for invoice_total."
kotadb> *returns the knowledge graph of services and files*

claude> "What breaks if I tweak billing_handler?"
kotadb> *responds with impact analysis across repos*

codex> "Surface similar auth routines."
kotadb> *delivers structural matches without regex fishing*

# Agents answer with context, not apologies`}
              </pre>
            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 text-center shadow-sm">
            <h4 className="text-xl font-semibold text-[var(--foreground)] mb-2">
              Agent-grade answers
            </h4>
            <p className="text-[var(--foreground-secondary)]">
              Hosted KotaDB streams knowledge so prompts land with precision.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 text-center shadow-sm">
            <h4 className="text-xl font-semibold text-[var(--foreground)] mb-2">
              Confident change windows
            </h4>
            <p className="text-[var(--foreground-secondary)]">
              Impact analysis keeps refactors honest before you touch prod.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 text-center shadow-sm">
            <h4 className="text-xl font-semibold text-[var(--foreground)] mb-2">
              SaaS first, OSS always
            </h4>
            <p className="text-[var(--foreground-secondary)]">
              Launch the managed service and audit the open-source code anytime.
            </p>
          </div>
        </div>
      </Section>

      {/* Installation */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--background)] w-full overflow-hidden">
        <div className="w-full max-w-7xl mx-auto">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[var(--foreground)] mb-8 sm:mb-12 md:mb-16 px-2">
            Launch KotaDB the way your team needs
          </h3>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="bg-[var(--card-bg)] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-[var(--card-border)] shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-4 sm:mb-6 flex items-center">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-teal-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
                Managed SaaS (recommended)
              </h4>
              <div className="bg-[var(--background-secondary)] rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 overflow-x-auto">
                <code className="text-teal-400 text-xs sm:text-sm font-[family-name:var(--font-roboto-mono)] whitespace-pre-wrap block">
                  1. Create an account → dashboard login 2. Connect the repos
                  that power your agents 3. Invite teammates and monitor usage
                  in one place
                </code>
              </div>
            </div>

            <div className="bg-[var(--card-bg)] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-[var(--card-border)] shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-4 sm:mb-6 flex items-center">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-emerald-500 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Explore the open-source code
              </h4>
              <div className="bg-[var(--background-secondary)] rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 overflow-x-auto">
                <code className="text-teal-400 text-xs sm:text-sm font-[family-name:var(--font-roboto-mono)] whitespace-pre-wrap break-all sm:break-normal block">
                  MIT-licensed repo on GitHub. Review the engine, fork it, or
                  extend it however your team likes to build.
                </code>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/pricing"
              className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-semibold inline-flex items-center gap-2 group"
            >
              Compare plans and see the FAQ
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--background-secondary)] w-full">
        <div className="w-full max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-[var(--foreground)] mb-16">
            Why platform teams trust KotaDB
          </h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-xl font-semibold text-[var(--foreground)] mb-3">
                Unified service layer
              </div>
              <div className="text-sm text-[var(--foreground-secondary)] opacity-80 leading-relaxed">
                CLI, REST, and MCP all ride the same code paths, so humans and
                agents never drift.
              </div>
            </div>
            <div>
              <div className="text-xl font-semibold text-[var(--foreground)] mb-3">
                Layered guardrails
              </div>
              <div className="text-sm text-[var(--foreground-secondary)] opacity-80 leading-relaxed">
                Caching, retries, validation, and tracing wrap every request for
                high-trust automation.
              </div>
            </div>
            <div>
              <div className="text-xl font-semibold text-[var(--foreground)] mb-3">
                Zero external databases
              </div>
              <div className="text-sm text-[var(--foreground-secondary)] opacity-80 leading-relaxed">
                WAL-backed storage keeps knowledge close without wiring another
                cloud dependency.
              </div>
            </div>
          </div>
        </div>
      </section>

      <GradientCallToAction
        title="Give your agents a hosted brain"
        description="Sign up for KotaDB SaaS and replace guesswork with grounded context in every Claude or Codex workflow."
        primaryCta={{ label: "Get Started", href: `${DASHBOARD_URL}/login` }}
        secondaryCtas={[
          { label: "View pricing", href: "/pricing" },
          {
            label: "Want a peek under the hood? Check out the code",
            href: "https://github.com/kotadb/kota-db",
            external: true,
          },
        ]}
      />

      <SiteFooter />
    </div>
  );
}
