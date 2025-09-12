import Link from "next/link";
import { ThemeToggle } from "@/components/ui";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-roboto)] overflow-x-hidden w-full page-container">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-xl bg-[var(--background)]/80 z-50 border-b border-[var(--border)]/50">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 max-w-7xl mx-auto">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <span className="text-xl font-bold text-[var(--foreground)]">KotaDB</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex items-center space-x-8">
                <Link
                  href="https://github.com/jayminwest/kota-db#documentation"
                  target="_blank"
                  className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors duration-200 text-sm font-medium"
                >
                  Documentation
                </Link>
                <Link
                  href="https://github.com/jayminwest/kota-db"
                  target="_blank"
                  className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors duration-200 text-sm font-medium"
                >
                  GitHub
                </Link>
              </div>
              
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <Link
                  href="https://github.com/jayminwest/kota-db#quickstart"
                  target="_blank"
                  className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-sm"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section pt-36 pb-32 min-h-screen flex items-center px-4 sm:px-6 lg:px-8 relative w-full">
        <div className="w-full max-w-4xl mx-auto text-center space-y-8">
          {/* Floating badge */}
          <div className="inline-flex items-center gap-2 bg-[var(--card-bg)] border border-[var(--border)] rounded-full px-4 py-2 text-sm text-[var(--foreground-secondary)] shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Powering AI development workflows
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--foreground)] leading-[1.1] tracking-tight">
            Give Claude Code
            <br />
            <span className="text-[var(--accent)]">real intelligence</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-[var(--foreground-secondary)] max-w-2xl mx-auto leading-relaxed">
            One file. Infinite context. Transform Claude Code from guessing to knowing your codebase.
          </p>

          {/* Launch CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Link
              href="https://github.com/jayminwest/kota-db#quickstart"
              target="_blank"
              className="group bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Started
              <svg className="ml-2 w-4 h-4 inline-block group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="https://github.com/jayminwest/kota-db"
              target="_blank"
              className="bg-[var(--card-bg)] hover:bg-[var(--button-secondary-hover)] border border-[var(--border)] text-[var(--foreground)] px-8 py-4 rounded-2xl font-semibold transition-all duration-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5"
            >
              View Source
            </Link>
          </div>

          {/* Simple links */}
          <div className="flex items-center justify-center gap-6 pt-8 text-sm">
            <Link
              href="https://github.com/jayminwest/kota-db"
              target="_blank"
              className="text-[var(--foreground-secondary)] hover:text-[var(--accent)] transition-colors duration-200 underline underline-offset-4"
            >
              View on GitHub
            </Link>
            <Link
              href="https://github.com/jayminwest/kota-db#quickstart"
              target="_blank"
              className="text-[var(--foreground-secondary)] hover:text-[var(--accent)] transition-colors duration-200 underline underline-offset-4"
            >
              Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 w-full">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4 tracking-tight">
              Three capabilities. Infinite possibilities.
            </h2>
            <p className="text-lg text-[var(--foreground-secondary)] max-w-2xl mx-auto">
              Enterprise-grade intelligence layer for Claude Code.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Context Understanding */}
            <div className="group relative">
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                  Instant Context
                </h3>
                <p className="text-[var(--foreground-secondary)] leading-relaxed mb-6">
                  Claude Code understands your entire codebase structure, dependencies, and relationships in seconds.
                </p>
                <div className="text-sm text-[var(--accent)] font-medium">
                  Deep code analysis →
                </div>
              </div>
            </div>

            {/* Zero Setup */}
            <div className="group relative">
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                  Zero Config
                </h3>
                <p className="text-[var(--foreground-secondary)] leading-relaxed mb-6">
                  One file, 30 seconds. No complex setup, no configuration hell, no learning curve.
                </p>
                <div className="text-sm text-[var(--accent)] font-medium">
                  Instant deployment →
                </div>
              </div>
            </div>

            {/* Enterprise Scale */}
            <div className="group relative">
              <div className="bg-[var(--card-bg)] border border-[var(--border)] rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                  Enterprise Ready
                </h3>
                <p className="text-[var(--foreground-secondary)] leading-relaxed mb-6">
                  Built for scale. Optimized storage, intelligent caching, production-grade performance.
                </p>
                <div className="text-sm text-[var(--accent)] font-medium">
                  Production scale →
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--background)] w-full">
        <div className="w-full max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-[var(--foreground)] mb-16">
            Stop Copy-Pasting Code Into Claude Code
          </h3>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/50 dark:to-red-900/50 border border-red-200 dark:border-red-800">
              <h4 className="text-2xl font-semibold text-red-800 dark:text-red-400 mb-6 flex items-center">
                <svg
                  className="w-8 h-8 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                Current: Context Chaos
              </h4>
              <ul className="space-y-4 text-red-700 dark:text-red-300">
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">×</span>
                  <span>Find the relevant files manually</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">×</span>
                  <span>Copy them into the chat window</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">×</span>
                  <span>Hope you got the right context</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">×</span>
                  <span>Watch Claude Code give confused answers anyway</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">×</span>
                  <span>Repeat the process for every conversation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">×</span>
                  <span>Your time is worth more than this</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-100 dark:from-teal-950/50 dark:to-emerald-900/50 border border-teal-200 dark:border-teal-800">
              <h4 className="text-2xl font-semibold text-teal-800 dark:text-teal-400 mb-6 flex items-center">
                <svg
                  className="w-8 h-8 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                KotaDB: Claude Code Gets It
              </h4>
              <ul className="space-y-4 text-teal-700 dark:text-teal-300">
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3 mt-1">✓</span>
                  <span>Claude Code has direct, intelligent access to your entire codebase</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3 mt-1">✓</span>
                  <span>No copy-paste. No guessing. Just understanding.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3 mt-1">✓</span>
                  <span>Claude Code knows who calls what, dependencies, impact analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3 mt-1">✓</span>
                  <span>Sub-millisecond queries across millions of symbols</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3 mt-1">✓</span>
                  <span>Claude Code becomes genuinely intelligent about your code</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3 mt-1">✓</span>
                  <span>This is what Claude Code-native development looks like</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--background)] w-full overflow-hidden">
        <div className="w-full max-w-7xl mx-auto">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[var(--foreground)] mb-6 sm:mb-8 md:mb-16 px-2">
            Context Chaos vs Intelligence: See the Difference
          </h3>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="bg-gradient-to-br from-red-900 to-red-950 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-2xl border border-red-800 mx-auto">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-red-400 text-xs sm:text-sm font-medium">
                    Current: Context Window Chaos
                  </span>
                </div>
                <div className="overflow-x-auto w-full">
                  <pre className="text-xs sm:text-sm font-[family-name:var(--font-roboto-mono)] whitespace-pre w-full">
                    <code className="text-red-300 block w-full">{`# You know the drill:
human> "Here's how my auth system works..."
human> "This function connects to..."
human> "The database layer is..."

# Every conversation starts with explaining your own code
human> *copies 15 files into chat*
human> *hopes Claude Code gets it*
claude> *gives confused answers anyway*

# Your time is worth more than this`}</code>
                  </pre>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-[var(--card-bg)] rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-2xl border border-[var(--card-border)] mx-auto">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-teal-400 text-xs sm:text-sm font-medium">
                    KotaDB: Claude Code Gets It
                  </span>
                  <button className="text-[var(--foreground-secondary)] hover:text-teal-400 transition-colors duration-200 flex-shrink-0">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                </div>
                <div className="overflow-x-auto w-full">
                  <pre className="text-xs sm:text-sm font-[family-name:var(--font-roboto-mono)] whitespace-pre w-full">
                    <code className="language-python text-[var(--foreground-secondary)] block w-full">{`# Your Claude Code already knows your codebase
claude> "I need to understand the auth flow"
kotadb> *instant access to all auth-related functions*
kotadb> *shows who calls what, dependencies, flow*

claude> "What happens if I change this function?"
kotadb> *impact analysis across entire codebase*
kotadb> *shows all affected files and functions*

claude> "Find similar patterns in the code"
kotadb> *structural understanding, not text matching*
kotadb> *shows architectural patterns and usage*

# Your Claude Code deserves to understand your code as well as you do`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <h4 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                Direct Code Understanding
              </h4>
              <p className="text-[var(--foreground-secondary)] leading-relaxed">
                Claude Code sees code as structure, not text
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                Photographic Memory
              </h4>
              <p className="text-[var(--foreground-secondary)] leading-relaxed">
                Every function, connection, dependency mapped
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                One File Setup
              </h4>
              <p className="text-[var(--foreground-secondary)] leading-relaxed">
                Drop .mcp.json in your project. Claude Code gets it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--background)] w-full overflow-hidden">
        <div className="w-full max-w-7xl mx-auto">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[var(--foreground)] mb-8 sm:mb-12 md:mb-16 px-2">
            Ready to unlock Claude Code's potential?
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
                Docker Compose
              </h4>
              <div className="bg-[var(--background-secondary)] rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 overflow-x-auto">
                <code className="text-teal-400 text-xs sm:text-sm font-[family-name:var(--font-roboto-mono)] whitespace-nowrap block">
                  docker-compose -f docker-compose.quickstart.yml up -d
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
                Quick Install Script
              </h4>
              <div className="bg-[var(--background-secondary)] rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 overflow-x-auto">
                <code className="text-teal-400 text-xs sm:text-sm font-[family-name:var(--font-roboto-mono)] whitespace-pre-wrap break-all sm:break-normal block">
                  curl -sSL
                  https://raw.githubusercontent.com/jayminwest/kota-db/main/quickstart/install.sh
                  | bash
                </code>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="https://github.com/jayminwest/kota-db#installation"
              target="_blank"
              className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-semibold inline-flex items-center gap-2 group"
            >
              View all installation options
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
            Built for Scale
          </h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-6xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent mb-3">
                3,600+
              </div>
              <div className="text-[var(--foreground)] font-medium">
                Ops/Second
              </div>
              <div className="text-sm text-[var(--foreground-secondary)] opacity-75 mt-2">
                Document insertions
              </div>
            </div>
            <div>
              <div className="text-6xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent mb-3">
                &lt;10ms
              </div>
              <div className="text-[var(--foreground)] font-medium">
                Query Latency
              </div>
              <div className="text-sm text-[var(--foreground-secondary)] opacity-75 mt-2">
                P95 response time
              </div>
            </div>
            <div>
              <div className="text-6xl font-bold bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent mb-3">
                Zero
              </div>
              <div className="text-[var(--foreground)] font-medium">
                External Dependencies
              </div>
              <div className="text-sm text-[var(--foreground-secondary)] opacity-75 mt-2">
                Single binary deployment
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Email Capture */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden w-full" style={{ background: 'var(--gradient-primary)' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20 opacity-30" />
        <div className="w-full max-w-4xl mx-auto text-center relative z-10">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 leading-tight">
            Ready to deploy intelligence?
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 leading-relaxed px-4 sm:px-0">
            Transform Claude Code from guessing to knowing your codebase. 
            Deploy the intelligence layer your team deserves in under 30 seconds.
          </p>

          {/* Launch CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 px-4 sm:px-0">
            <Link
              href="https://github.com/jayminwest/kota-db#quickstart"
              target="_blank"
              className="group bg-white text-[var(--accent)] hover:bg-white/90 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-1"
            >
              Deploy Now
              <svg className="ml-2 w-5 h-5 inline-block group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0">
            <Link
              href="https://github.com/jayminwest/kota-db"
              target="_blank"
              className="text-white/80 hover:text-white transition-all duration-200 text-sm"
            >
              Explore on GitHub
            </Link>
            <span className="text-white/50 hidden sm:inline">•</span>
            <Link
              href="https://github.com/jayminwest/kota-db#documentation"
              target="_blank"
              className="text-white/80 hover:text-white transition-all duration-200 text-sm"
            >
              Read Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--background-secondary)] border-t border-[var(--border)] w-full">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                KotaDB
              </h4>
              <p className="text-[var(--foreground-secondary)]">
                The Claude Code-native codebase intelligence layer.
              </p>
            </div>
            <div>
              <h5 className="text-[var(--accent)] font-semibold mb-4 uppercase tracking-wider text-sm">
                Resources
              </h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://github.com/jayminwest/kota-db#documentation"
                    target="_blank"
                    className="text-[var(--foreground-secondary)] hover:text-teal-400 transition-colors duration-200"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/jayminwest/kota-db#quickstart"
                    target="_blank"
                    className="text-[var(--foreground-secondary)] hover:text-teal-400 transition-colors duration-200"
                  >
                    Quick Start
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/jayminwest/kota-db/blob/main/examples"
                    target="_blank"
                    className="text-[var(--foreground-secondary)] hover:text-teal-400 transition-colors duration-200"
                  >
                    Examples
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-[var(--foreground)] font-semibold mb-4">Community</h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://github.com/jayminwest/kota-db"
                    target="_blank"
                    className="text-[var(--foreground-secondary)] hover:text-teal-400 transition-colors duration-200"
                  >
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/jayminwest/kota-db/issues"
                    target="_blank"
                    className="text-[var(--foreground-secondary)] hover:text-teal-400 transition-colors duration-200"
                  >
                    Issues
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/jayminwest/kota-db/discussions"
                    target="_blank"
                    className="text-[var(--foreground-secondary)] hover:text-teal-400 transition-colors duration-200"
                  >
                    Discussions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-[var(--foreground)] font-semibold mb-4">Connect</h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://github.com/jayminwest"
                    target="_blank"
                    className="text-[var(--foreground-secondary)] hover:text-teal-400 transition-colors duration-200"
                  >
                    Author GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/jayminwest/kota-db/blob/main/LICENSE"
                    target="_blank"
                    className="text-[var(--foreground-secondary)] hover:text-teal-400 transition-colors duration-200"
                  >
                    License
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[var(--border)] text-center text-[var(--foreground-secondary)] opacity-75">
            <p>
              &copy; 2024 KotaDB. Built with passion for the future of knowledge
              work.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
