import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-lg bg-white/80 dark:bg-slate-950/80 z-50 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-teal-600 dark:from-teal-400 dark:to-teal-200 bg-clip-text text-transparent">
                KotaDB
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="https://github.com/jayminwest/kota-db"
                target="_blank"
                className="text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-all duration-200"
              >
                GitHub
              </Link>
              <Link
                href="https://github.com/jayminwest/kota-db#documentation"
                target="_blank"
                className="text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-all duration-200"
              >
                Docs
              </Link>
              <Link
                href="https://github.com/jayminwest/kota-db#quickstart"
                target="_blank"
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-5 py-2 rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/20 via-transparent to-slate-100/20 dark:from-teal-900/10 dark:via-transparent dark:to-slate-800/10" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-slate-50 mb-6 leading-tight">
            Database for Distributed
            <span className="bg-gradient-to-r from-teal-500 via-teal-400 to-cyan-400 dark:from-teal-400 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent">
              {" "}
              Human-AI Cognition
            </span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            A high-performance database designed for intelligent document
            storage, search, and relationship management. Built for the future
            of collaborative knowledge work.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="https://github.com/jayminwest/kota-db#quickstart"
              target="_blank"
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Quick Start
            </Link>
            <Link
              href="https://github.com/jayminwest/kota-db"
              target="_blank"
              className="bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white border border-slate-700 dark:border-slate-600 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
            >
              View on GitHub
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-slate-900 dark:text-slate-50 mb-16">
            Built for Modern Knowledge Management
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-600 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-800 dark:to-teal-900 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-teal-600 dark:text-teal-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3">
                Native Markdown
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Store documents in native Markdown format with full preservation
                of structure and content.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-600 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-800 dark:to-teal-800 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-emerald-600 dark:text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3">
                Smart Search
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Multiple search indexes including B+ Tree, Trigram, and upcoming
                graph & semantic search.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-600 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-800 dark:to-purple-800 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-violet-600 dark:text-violet-400"
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
              </div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3">
                High Performance
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Achieve 3,600+ document operations per second with optimized
                Rust implementation.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-600 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-800 dark:to-orange-800 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-amber-600 dark:text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3">
                Crash-Safe
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Write-Ahead Logging (WAL) ensures data integrity and crash
                recovery capabilities.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-600 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-800 dark:to-pink-800 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-rose-600 dark:text-rose-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3">
                Type-Safe Clients
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Native client libraries for Rust, Python, and TypeScript with
                full type safety.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 hover:border-teal-300 dark:hover:border-teal-600 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-800 dark:to-blue-800 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3">
                Zero Dependencies
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                No external database dependencies. Everything runs in a single,
                efficient process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-slate-900 dark:text-slate-50 mb-16">
            Simple and Intuitive API
          </h3>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-8 overflow-x-auto shadow-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-teal-400 text-sm font-medium">
                    Python Example
                  </span>
                  <button className="text-slate-400 hover:text-teal-400 transition-colors duration-200">
                    <svg
                      className="w-5 h-5"
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
                <pre className="text-sm">
                  <code className="language-python text-slate-300">{`from kota_db import KotaDB, DocumentBuilder

# Connect to KotaDB
db = KotaDB("http://localhost:8080")

# Insert a document with builder pattern
doc_id = db.insert_with_builder(
    DocumentBuilder()
    .path("/knowledge/python-patterns.md")
    .title("Python Design Patterns")
    .content("# Python Patterns\\n\\nExploring design patterns...")
    .add_tag("python")
    .add_tag("patterns")
)

# Search documents
results = db.search("design patterns")
for doc in results:
    print(f"Found: {doc.title} at {doc.path}")

# Query with natural language
docs = db.query("show me all Python tutorials from last week")`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3">
                Rust
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Native performance with safe concurrency
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3">
                Python
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Pythonic API for data science workflows
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3">
                TypeScript
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Type-safe client for web applications
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-slate-900 dark:text-slate-50 mb-16">
            Get Started in Seconds
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-6 flex items-center">
                <svg
                  className="w-6 h-6 mr-3 text-teal-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
                Docker Compose
              </h4>
              <div className="bg-slate-950 rounded-xl p-5 overflow-x-auto">
                <code className="text-teal-400 text-sm font-mono">
                  docker-compose -f docker-compose.quickstart.yml up -d
                </code>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-6 flex items-center">
                <svg
                  className="w-6 h-6 mr-3 text-emerald-500"
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
              <div className="bg-slate-950 rounded-xl p-5 overflow-x-auto">
                <code className="text-teal-400 text-sm font-mono">
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
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-slate-900 dark:text-slate-50 mb-16">
            Built for Scale
          </h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-6xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent mb-3">
                3,600+
              </div>
              <div className="text-slate-700 dark:text-slate-300 font-medium">
                Ops/Second
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                Document insertions
              </div>
            </div>
            <div>
              <div className="text-6xl font-bold bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent mb-3">
                &lt;10ms
              </div>
              <div className="text-slate-700 dark:text-slate-300 font-medium">
                Query Latency
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                P95 response time
              </div>
            </div>
            <div>
              <div className="text-6xl font-bold bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent mb-3">
                Zero
              </div>
              <div className="text-slate-700 dark:text-slate-300 font-medium">
                External Dependencies
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-500 mt-2">
                Single binary deployment
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-teal-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-slate-800/10 opacity-30" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h3 className="text-4xl lg:text-5xl font-bold text-white mb-8">
            Ready to Transform Your Knowledge Management?
          </h3>
          <p className="text-xl text-teal-100 mb-10">
            Join the future of distributed human-AI cognition with KotaDB.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="https://github.com/jayminwest/kota-db"
              target="_blank"
              className="bg-teal-400 hover:bg-teal-300 text-slate-900 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Get Started Free
            </Link>
            <Link
              href="https://github.com/jayminwest/kota-db#documentation"
              target="_blank"
              className="bg-transparent hover:bg-white/10 text-white border-2 border-teal-400 hover:border-teal-300 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
            >
              Read Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                KotaDB
              </h4>
              <p className="text-slate-400">
                Database for distributed human-AI cognition.
              </p>
            </div>
            <div>
              <h5 className="text-teal-400 font-semibold mb-4 uppercase tracking-wider text-sm">
                Resources
              </h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://github.com/jayminwest/kota-db#documentation"
                    target="_blank"
                    className="text-slate-400 hover:text-teal-400 transition-colors duration-200"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/jayminwest/kota-db#quickstart"
                    target="_blank"
                    className="text-slate-400 hover:text-teal-400 transition-colors duration-200"
                  >
                    Quick Start
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/jayminwest/kota-db/blob/main/examples"
                    target="_blank"
                    className="text-slate-400 hover:text-teal-400 transition-colors duration-200"
                  >
                    Examples
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Community</h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://github.com/jayminwest/kota-db"
                    target="_blank"
                    className="text-slate-400 hover:text-teal-400 transition-colors duration-200"
                  >
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/jayminwest/kota-db/issues"
                    target="_blank"
                    className="text-slate-400 hover:text-teal-400 transition-colors duration-200"
                  >
                    Issues
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/jayminwest/kota-db/discussions"
                    target="_blank"
                    className="text-slate-400 hover:text-teal-400 transition-colors duration-200"
                  >
                    Discussions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Connect</h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://github.com/jayminwest"
                    target="_blank"
                    className="text-slate-400 hover:text-teal-400 transition-colors duration-200"
                  >
                    Author GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/jayminwest/kota-db/blob/main/LICENSE"
                    target="_blank"
                    className="text-slate-400 hover:text-teal-400 transition-colors duration-200"
                  >
                    License
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500">
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
