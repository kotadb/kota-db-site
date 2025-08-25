import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                KotaDB
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="https://github.com/jayminwest/kota-db"
                target="_blank"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                GitHub
              </Link>
              <Link
                href="https://github.com/jayminwest/kota-db#documentation"
                target="_blank"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                Docs
              </Link>
              <Link
                href="https://github.com/jayminwest/kota-db#quickstart"
                target="_blank"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Database for Distributed
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Human-AI Cognition
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            A high-performance database designed for intelligent document
            storage, search, and relationship management. Built for the future
            of collaborative knowledge work.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="https://github.com/jayminwest/kota-db#quickstart"
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Quick Start
            </Link>
            <Link
              href="https://github.com/jayminwest/kota-db"
              target="_blank"
              className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              View on GitHub
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Built for Modern Knowledge Management
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
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
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Native Markdown
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Store documents in native Markdown format with full preservation
                of structure and content.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-400"
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
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Smart Search
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Multiple search indexes including B+ Tree, Trigram, and upcoming
                graph & semantic search.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600 dark:text-purple-400"
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
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                High Performance
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Achieve 3,600+ document operations per second with optimized
                Rust implementation.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-orange-600 dark:text-orange-400"
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
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Crash-Safe
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Write-Ahead Logging (WAL) ensures data integrity and crash
                recovery capabilities.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-red-600 dark:text-red-400"
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
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Type-Safe Clients
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Native client libraries for Rust, Python, and TypeScript with
                full type safety.
              </p>
            </div>

            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
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
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Zero Dependencies
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                No external database dependencies. Everything runs in a single,
                efficient process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Simple and Intuitive API
          </h3>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-3">
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 text-sm">Python Example</span>
                  <button className="text-gray-400 hover:text-white transition-colors">
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
                  <code className="language-python text-gray-300">{`from kota_db import KotaDB, DocumentBuilder

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
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Rust
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Native performance with safe concurrency
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Python
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Pythonic API for data science workflows
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                TypeScript
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Type-safe client for web applications
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Get Started in Seconds
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
                Docker Compose
              </h4>
              <div className="bg-gray-900 rounded p-4 overflow-x-auto">
                <code className="text-green-400 text-sm">
                  docker-compose -f docker-compose.quickstart.yml up -d
                </code>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-green-600"
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
              <div className="bg-gray-900 rounded p-4 overflow-x-auto">
                <code className="text-green-400 text-sm">
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
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold"
            >
              View all installation options →
            </Link>
          </div>
        </div>
      </section>

      {/* Performance Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Built for Scale
          </h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                3,600+
              </div>
              <div className="text-gray-600 dark:text-gray-400">Ops/Second</div>
              <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                Document insertions
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
                &lt;10ms
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Query Latency
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                P95 response time
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                Zero
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                External Dependencies
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                Single binary deployment
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Knowledge Management?
          </h3>
          <p className="text-xl text-blue-100 mb-8">
            Join the future of distributed human-AI cognition with KotaDB.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="https://github.com/jayminwest/kota-db"
              target="_blank"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              href="https://github.com/jayminwest/kota-db#documentation"
              target="_blank"
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Read Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold text-white mb-4">KotaDB</h4>
              <p className="text-gray-400">
                Database for distributed human-AI cognition.
              </p>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Resources</h5>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://github.com/jayminwest/kota-db#documentation"
                    target="_blank"
                    className="text-gray-400 hover:text-white"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/jayminwest/kota-db#quickstart"
                    target="_blank"
                    className="text-gray-400 hover:text-white"
                  >
                    Quick Start
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/jayminwest/kota-db/blob/main/examples"
                    target="_blank"
                    className="text-gray-400 hover:text-white"
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
                    className="text-gray-400 hover:text-white"
                  >
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/jayminwest/kota-db/issues"
                    target="_blank"
                    className="text-gray-400 hover:text-white"
                  >
                    Issues
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/jayminwest/kota-db/discussions"
                    target="_blank"
                    className="text-gray-400 hover:text-white"
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
                    className="text-gray-400 hover:text-white"
                  >
                    Author GitHub
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/jayminwest/kota-db/blob/main/LICENSE"
                    target="_blank"
                    className="text-gray-400 hover:text-white"
                  >
                    License
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
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
