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

      {/* Hero Section - 2025 Minimalist Design */}
      <section className="hero-section pt-40 pb-40 min-h-screen flex items-center px-6 sm:px-8 lg:px-12 relative w-full">
        <div className="w-full max-w-5xl mx-auto text-center space-y-10">
          {/* Floating badge - subtle glassmorphism */}
          <div className="inline-flex items-center gap-2 backdrop-blur-md bg-[var(--card-bg)]/60 border border-[var(--border)]/30 rounded-full px-5 py-2.5 text-sm text-[var(--foreground-secondary)] shadow-sm hover:shadow-md hover:border-[var(--border)] transition-all duration-300">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Managed for Claude + Codex
          </div>

          {/* Main headline - larger, bolder, more space */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--foreground)] leading-[1.08] tracking-tight px-2 sm:px-4">
            Hosted intelligence for
            <br />
            <span className="text-[var(--accent)] bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] bg-clip-text text-transparent">
              coding agents that ship
            </span>
          </h1>

          {/* Subtitle - larger, more prominent */}
          <p className="text-xl sm:text-2xl text-[var(--foreground-secondary)] max-w-3xl mx-auto leading-relaxed font-light">
            KotaDB gives Claude Code and Codex a managed knowledge graph, so
            your team stops filling context windows with grep, find, or awk
            guesses.
          </p>

          {/* Launch CTA - simplified, bolder */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mt-14">
            <Link
              href={`${DASHBOARD_URL}/login`}
              className="group bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-10 py-5 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 text-base"
            >
              Get Started
              <svg
                className="ml-2 w-4 h-4 inline-block group-hover:translate-x-1 transition-transform duration-300"
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
              className="backdrop-blur-md bg-[var(--card-bg)]/60 hover:bg-[var(--card-bg)] border border-[var(--border)] hover:border-[var(--border-hover)] text-[var(--foreground)] px-10 py-5 rounded-2xl font-semibold transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 text-base"
            >
              View Pricing
            </Link>
          </div>

          {/* Simple links - more subtle */}
          <div className="flex items-center justify-center gap-8 pt-10 text-sm">
            <Link
              href="https://github.com/kotadb/kota-db"
              target="_blank"
              className="text-[var(--foreground-secondary)] hover:text-[var(--accent)] transition-colors duration-300 underline underline-offset-4 decoration-[var(--border)]"
            >
              Check out the code
            </Link>
            <Link
              href="https://github.com/kotadb/kota-db#quickstart"
              target="_blank"
              className="text-[var(--foreground-secondary)] hover:text-[var(--accent)] transition-colors duration-300 underline underline-offset-4 decoration-[var(--border)]"
            >
              Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid - Glassmorphism Cards */}
      <Section variant="spacious" containerClassName="max-w-6xl">
        <div className="w-full mx-auto">
          <SectionHeading
            title="Three pillars. One hosted brain."
            subtitle="KotaDB keeps your agents grounded with live knowledge, governed access, and production-ready guardrails."
          />

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Context Understanding */}
            <div className="group relative">
              <div className="backdrop-blur-lg bg-[var(--card-bg)]/90 border border-[var(--border)]/40 rounded-3xl p-8 sm:p-10 shadow-xl hover:shadow-2xl hover:border-[var(--border)] transition-all duration-500 group-hover:-translate-y-2 focus-within:ring-2 focus-within:ring-[var(--accent)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--background)]">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 flex items-center justify-center mb-8">
                  <svg
                    className="w-7 h-7 text-[var(--accent)]"
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
                <h3 className="text-xl sm:text-2xl font-semibold text-[var(--foreground)] mb-3 sm:mb-4">
                  Hosted Knowledge Graph
                </h3>
                <p className="text-[var(--foreground-secondary)] leading-relaxed text-sm sm:text-base mb-6 sm:mb-8">
                  KotaDB ingests your repositories and feeds Claude and Codex
                  curated answers instead of manual spelunking.
                </p>
                <div className="text-sm text-[var(--accent)] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  Graph-aware responses
                  <svg
                    className="w-4 h-4"
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
                </div>
              </div>
            </div>

            {/* Zero Setup */}
            <div className="group relative">
              <div className="backdrop-blur-lg bg-[var(--card-bg)]/90 border border-[var(--border)]/40 rounded-3xl p-8 sm:p-10 shadow-xl hover:shadow-2xl hover:border-[var(--border)] transition-all duration-500 group-hover:-translate-y-2 focus-within:ring-2 focus-within:ring-[var(--accent)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--background)]">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 flex items-center justify-center mb-8">
                  <svg
                    className="w-7 h-7 text-[var(--accent)]"
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
                <h3 className="text-xl sm:text-2xl font-semibold text-[var(--foreground)] mb-3 sm:mb-4">
                  Enterprise Controls
                </h3>
                <p className="text-[var(--foreground-secondary)] leading-relaxed text-sm sm:text-base mb-6 sm:mb-8">
                  API keys, rate limits, and team workspaces stay in sync across
                  every interface with the managed dashboard.
                </p>
                <div className="text-sm text-[var(--accent)] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  Govern usage in minutes
                  <svg
                    className="w-4 h-4"
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
                </div>
              </div>
            </div>

            {/* Enterprise Scale */}
            <div className="group relative">
              <div className="backdrop-blur-lg bg-[var(--card-bg)]/90 border border-[var(--border)]/40 rounded-3xl p-8 sm:p-10 shadow-xl hover:shadow-2xl hover:border-[var(--border)] transition-all duration-500 group-hover:-translate-y-2 focus-within:ring-2 focus-within:ring-[var(--accent)] focus-within:ring-offset-2 focus-within:ring-offset-[var(--background)]">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 flex items-center justify-center mb-8">
                  <svg
                    className="w-7 h-7 text-[var(--accent)]"
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
                <h3 className="text-xl sm:text-2xl font-semibold text-[var(--foreground)] mb-3 sm:mb-4">
                  High-Trust Operations
                </h3>
                <p className="text-[var(--foreground-secondary)] leading-relaxed text-sm sm:text-base mb-6 sm:mb-8">
                  Layered safety wrappers, WAL durability, and zero external
                  databases keep every answer steady.
                </p>
                <div className="text-sm text-[var(--accent)] font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  Resilience baked in
                  <svg
                    className="w-4 h-4"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Comparison Section - Improved Spacing */}
      <Section containerClassName="max-w-6xl">
        <div className="w-full mx-auto">
          <SectionHeading
            title="Before KotaDB vs. after KotaDB"
            subtitle="Swap the guesswork and context wrangling for hosted intelligence your agents can trust."
          />

          <div className="mt-16 grid md:grid-cols-2 gap-8 md:gap-10">
            <div className="backdrop-blur-md bg-[var(--card-bg)]/90 rounded-3xl border border-red-200/70 dark:border-red-900/60 p-8 sm:p-10 md:p-12 shadow-lg hover:shadow-xl transition-all duration-300">
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--error-bg)] text-[var(--error-text-dark)] px-4 py-2 text-sm font-semibold">
                Before KotaDB
              </span>
              <ul className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 text-[var(--foreground-secondary)] text-sm sm:text-base">
                <li className="flex gap-3 sm:gap-4">
                  <span
                    className="mt-1 text-[var(--color-red-700)] dark:text-[var(--color-red-400)] text-lg flex-shrink-0"
                    aria-hidden="true"
                  >
                    ×
                  </span>
                  <span>
                    Hop between tabs hunting for the right files to paste.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span
                    className="mt-1 text-[var(--color-red-700)] dark:text-[var(--color-red-400)] text-lg"
                    aria-hidden="true"
                  >
                    ×
                  </span>
                  <span>
                    Dump grep/find/awk results into prompts and hope they stick.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span
                    className="mt-1 text-[var(--color-red-700)] dark:text-[var(--color-red-400)] text-lg"
                    aria-hidden="true"
                  >
                    ×
                  </span>
                  <span>
                    Explain dependency chains to every new agent session.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span
                    className="mt-1 text-[var(--color-red-700)] dark:text-[var(--color-red-400)] text-lg"
                    aria-hidden="true"
                  >
                    ×
                  </span>
                  <span>
                    Ship refactors while wondering which services you missed.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span
                    className="mt-1 text-[var(--color-red-700)] dark:text-[var(--color-red-400)] text-lg"
                    aria-hidden="true"
                  >
                    ×
                  </span>
                  <span>Trade release velocity for manual safety checks.</span>
                </li>
              </ul>
            </div>

            <div className="backdrop-blur-md bg-[var(--card-bg)]/90 rounded-3xl border border-[var(--accent)]/50 p-8 sm:p-10 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-300">
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] px-4 py-2 text-sm font-semibold">
                With KotaDB
              </span>
              <ul className="mt-6 sm:mt-8 space-y-4 sm:space-y-5 text-[var(--foreground-secondary)] text-sm sm:text-base">
                <li className="flex gap-3 sm:gap-4">
                  <span
                    className="mt-1 text-[var(--accent)] text-lg font-bold flex-shrink-0"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span>
                    Your repos stay indexed in a hosted, queryable knowledge
                    graph.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span
                    className="mt-1 text-[var(--accent)] text-lg font-bold"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span>
                    Claude and Codex pull structured context with a single
                    prompt.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span
                    className="mt-1 text-[var(--accent)] text-lg font-bold"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span>
                    CLI, REST, and MCP share one service layer—answers never
                    drift.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span
                    className="mt-1 text-[var(--accent)] text-lg font-bold"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span>
                    Impact analysis shows what breaks before you merge.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span
                    className="mt-1 text-[var(--accent)] text-lg font-bold"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span>
                    Quota, key, and tenant controls are baked into the managed
                    plane.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Manual vs Hosted */}
      <Section containerClassName="max-w-6xl">
        <SectionHeading
          title="Manual context vs hosted intelligence"
          subtitle="See how conversations shift when your agents stop guessing and start pulling from a shared knowledge graph."
        />

        <div className="mt-12 grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="backdrop-blur-md bg-[var(--card-bg)]/90 rounded-3xl border border-red-200/70 dark:border-red-900/60 p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--error-bg)] text-[var(--error-text-dark)] px-4 py-2 text-sm font-semibold mb-6">
              Without KotaDB
            </span>

            <div className="space-y-6">
              <div className="bg-red-500/5 border border-red-200/60 dark:border-red-900/40 rounded-xl p-4 sm:p-5">
                <p className="text-sm sm:text-base text-[var(--color-red-900)] dark:text-[var(--color-red-300)] font-semibold mb-2">
                  Every request needs context first
                </p>
                <div className="space-y-2 text-sm sm:text-base text-[var(--color-red-900)] dark:text-[var(--color-red-300)] font-mono">
                  <p>human&gt; &quot;Where does invoice_total get set?&quot;</p>
                  <p className="text-[var(--color-red-800)] dark:text-[var(--color-red-400)]/70 italic">
                    *opens five tabs, runs grep, repeats the prompt*
                  </p>
                  <p>agent&gt; &quot;Maybe here? need more detail.&quot;</p>
                </div>
              </div>

              <div className="bg-red-500/5 border border-red-200/60 dark:border-red-900/40 rounded-xl p-4 sm:p-5">
                <p className="text-sm sm:text-base text-[var(--color-red-900)] dark:text-[var(--color-red-300)] font-semibold mb-2">
                  Impact checks become guesswork
                </p>
                <div className="space-y-2 text-sm sm:text-base text-[var(--color-red-900)] dark:text-[var(--color-red-300)] font-mono">
                  <p>
                    human&gt; &quot;What breaks if I touch
                    billing_handler?&quot;
                  </p>
                  <p className="text-[var(--color-red-800)] dark:text-[var(--color-red-400)]/70 italic">
                    *maps the call tree manually*
                  </p>
                  <p>agent&gt; *shrugs in autocomplete*</p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[var(--color-red-900)] dark:text-[var(--color-red-300)] font-semibold italic text-center pt-2">
                Half the sprint disappears into context handoffs
              </p>
            </div>
          </div>

          <div className="backdrop-blur-md bg-[var(--card-bg)]/90 rounded-3xl border border-[var(--accent)]/50 p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] px-4 py-2 text-sm font-semibold mb-6">
              With KotaDB
            </span>

            <div className="space-y-6">
              <div className="bg-[var(--background-secondary)] border border-[var(--border)] rounded-xl p-4 sm:p-5">
                <p className="text-xs sm:text-sm text-[var(--accent)] font-semibold mb-2">
                  Claude and Codex stay grounded
                </p>
                <div className="space-y-2 text-xs sm:text-sm text-[var(--foreground-secondary)] font-mono">
                  <p>claude&gt; &quot;Show callers for invoice_total.&quot;</p>
                  <p className="text-[var(--accent)]/70 italic">
                    *returns the knowledge graph of services and files*
                  </p>
                </div>
              </div>

              <div className="bg-[var(--background-secondary)] border border-[var(--border)] rounded-xl p-4 sm:p-5">
                <div className="space-y-2 text-xs sm:text-sm text-[var(--foreground-secondary)] font-mono">
                  <p>
                    claude&gt; &quot;What breaks if I tweak
                    billing_handler?&quot;
                  </p>
                  <p className="text-[var(--accent)]/70 italic">
                    *responds with impact analysis across repos*
                  </p>
                </div>
              </div>

              <div className="bg-[var(--background-secondary)] border border-[var(--border)] rounded-xl p-4 sm:p-5">
                <div className="space-y-2 text-xs sm:text-sm text-[var(--foreground-secondary)] font-mono">
                  <p>codex&gt; &quot;Surface similar auth routines.&quot;</p>
                  <p className="text-[var(--accent)]/70 italic">
                    *delivers structural matches without regex fishing*
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[var(--accent)] font-semibold italic text-center pt-2">
                Agents answer with context, not apologies
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          <div className="backdrop-blur-md bg-[var(--card-bg)]/60 rounded-2xl border border-[var(--border)]/40 p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300">
            <h4 className="text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-2">
              Agent-grade answers
            </h4>
            <p className="text-sm sm:text-base text-[var(--foreground-secondary)]">
              Hosted KotaDB streams knowledge so prompts land with precision.
            </p>
          </div>
          <div className="backdrop-blur-md bg-[var(--card-bg)]/60 rounded-2xl border border-[var(--border)]/40 p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300">
            <h4 className="text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-2">
              Confident change windows
            </h4>
            <p className="text-sm sm:text-base text-[var(--foreground-secondary)]">
              Impact analysis keeps refactors honest before you touch prod.
            </p>
          </div>
          <div className="backdrop-blur-md bg-[var(--card-bg)]/60 rounded-2xl border border-[var(--border)]/40 p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 sm:col-span-2 lg:col-span-1">
            <h4 className="text-lg sm:text-xl font-semibold text-[var(--foreground)] mb-2">
              SaaS first, OSS always
            </h4>
            <p className="text-sm sm:text-base text-[var(--foreground-secondary)]">
              Launch the managed service and audit the open-source code anytime.
            </p>
          </div>
        </div>
      </Section>

      {/* Installation */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 bg-[var(--background)] w-full overflow-hidden">
        <div className="w-full max-w-5xl mx-auto">
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
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-[var(--background-secondary)] w-full">
        <div className="w-full max-w-5xl mx-auto">
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
