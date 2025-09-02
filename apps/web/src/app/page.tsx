import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 font-[family-name:var(--font-roboto)] overflow-x-hidden w-full">
      {/* Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-lg bg-white/80 dark:bg-slate-950/80 z-50 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 max-w-7xl mx-auto">
            <div className="flex items-center min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-slate-900 to-teal-600 dark:from-teal-400 dark:to-teal-200 bg-clip-text text-transparent truncate">
                KotaDB
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 md:gap-6 flex-shrink-0">
              <Link
                href="https://github.com/jayminwest/kota-db"
                target="_blank"
                className="text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-all duration-200 text-xs sm:text-sm md:text-base whitespace-nowrap"
              >
                GitHub
              </Link>
              <Link
                href="https://github.com/jayminwest/kota-db#documentation"
                target="_blank"
                className="hidden md:inline-block text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-all duration-200 whitespace-nowrap"
              >
                Docs
              </Link>
              <Link
                href="https://github.com/jayminwest/kota-db#quickstart"
                target="_blank"
                className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-2 py-1 sm:px-3 sm:py-1.5 md:px-5 md:py-2 rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm md:text-base whitespace-nowrap"
              >
                Start
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section pt-32 pb-32 min-h-screen flex items-center px-4 sm:px-6 lg:px-8 relative w-full">
        {/* Animated background */}
        <div className="absolute inset-0">
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

          {/* Animated gradient orbs - mobile optimized */}
          <div className="absolute top-0 -left-4 w-48 h-48 sm:w-72 sm:h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob dark:mix-blend-screen dark:opacity-10" />
          <div className="absolute top-0 -right-4 w-48 h-48 sm:w-72 sm:h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 dark:mix-blend-screen dark:opacity-10" />
          <div className="absolute -bottom-8 left-20 w-48 h-48 sm:w-72 sm:h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 dark:mix-blend-screen dark:opacity-10" />

          {/* Floating code symbols - hidden on mobile */}
          <div className="absolute inset-0 hidden sm:block">
            <div className="absolute top-1/4 left-1/4 text-teal-500/10 text-4xl md:text-6xl font-mono animate-float-slow">{`</>`}</div>
            <div className="absolute top-3/4 right-1/3 text-cyan-500/10 text-3xl md:text-4xl font-mono animate-float-slower">{`{}`}</div>
            <div className="absolute bottom-1/4 left-1/3 text-emerald-500/10 text-4xl md:text-5xl font-mono animate-float">{`()`}</div>
            <div className="absolute top-1/2 right-1/4 text-teal-500/10 text-2xl md:text-3xl font-mono animate-float-slow">{`[]`}</div>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-50 mb-6 leading-tight">
            Beyond grep:
            <span className="bg-gradient-to-r from-teal-500 via-teal-400 to-cyan-400 dark:from-teal-400 dark:via-teal-300 dark:to-cyan-300 bg-clip-text text-transparent">
              {" "}
              True Codebase Intelligence
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            While grep searches text, KotaDB understands your code&apos;s
            relationships, dependencies, and structure. Powers LLM tooling like
            Claude Code with semantic search that&apos;s 210x faster than
            traditional approaches.
          </p>

          {/* Email Capture for Waitlist */}
          <div className="max-w-md mx-auto mb-8 px-4 sm:px-0">
            <EmailCapture source="hero_section" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0">
            <Link
              href="https://github.com/jayminwest/kota-db#quickstart"
              target="_blank"
              className="text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-all duration-200 text-sm"
            >
              View Documentation
            </Link>
            <span className="text-slate-400 dark:text-slate-600 hidden sm:inline">
              •
            </span>
            <Link
              href="https://github.com/jayminwest/kota-db"
              target="_blank"
              className="text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400 transition-all duration-200 text-sm"
            >
              GitHub Repository
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 w-full">
        <div className="w-full max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-slate-900 dark:text-slate-50 mb-8">
            Why grep Falls Short
          </h3>
          <p className="text-lg text-center text-slate-600 dark:text-slate-400 mb-16 max-w-4xl mx-auto">
            Traditional text search tools like grep can find strings, but they
            can&apos;t understand code structure, relationships, or context.
            KotaDB was built for the modern age of AI-assisted development.
          </p>
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
                Semantic Understanding
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Unlike grep&apos;s text matching, KotaDB extracts and
                understands functions, classes, and their relationships across
                your entire codebase.
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
                Beyond Text Search
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                grep finds text patterns. KotaDB builds a full relationship
                graph showing what calls what, enabling true semantic search and
                instant impact analysis.
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
                Blazing Performance
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                While grep processes text linearly, KotaDB uses trigram indexing
                for &lt;3ms search latency—210x faster than grep-based
                approaches.
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
                Smart Impact Analysis
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                grep can&apos;t tell you what breaks when you change code.
                KotaDB&apos;s dependency graph shows exactly which functions and
                files are affected by any change.
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
                AI-First Design
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Built for the AI era. grep outputs text—KotaDB provides
                structured data perfect for LLMs. MCP server enables seamless
                Claude Code integration.
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
                Dual Storage
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Optimized separation of documents and graph data for maximum
                performance at scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 w-full">
        <div className="w-full max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-slate-900 dark:text-slate-50 mb-16">
            grep vs KotaDB: The Evolution of Code Search
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
                grep: 1970s Text Search
              </h4>
              <ul className="space-y-4 text-red-700 dark:text-red-300">
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">×</span>
                  <span>Only finds literal text matches</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">×</span>
                  <span>
                    No understanding of code structure or relationships
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">×</span>
                  <span>Can&apos;t analyze dependencies or impact</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">×</span>
                  <span>Outputs unstructured text unsuitable for LLMs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">×</span>
                  <span>Slow linear search through entire codebase</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">×</span>
                  <span>False positives from comments and strings</span>
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
                KotaDB: Modern Intelligence
              </h4>
              <ul className="space-y-4 text-teal-700 dark:text-teal-300">
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3 mt-1">✓</span>
                  <span>
                    Semantic understanding of functions, classes, and methods
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3 mt-1">✓</span>
                  <span>Complete relationship graph of dependencies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3 mt-1">✓</span>
                  <span>Instant impact analysis showing affected code</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3 mt-1">✓</span>
                  <span>Structured data optimized for AI tools and LLMs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3 mt-1">✓</span>
                  <span>
                    Sub-3ms search with trigram indexing (210x faster)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal-500 mr-3 mt-1">✓</span>
                  <span>
                    Context-aware results focused on actual code symbols
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 w-full overflow-hidden">
        <div className="w-full max-w-7xl mx-auto">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-slate-900 dark:text-slate-50 mb-6 sm:mb-8 md:mb-16 px-2">
            grep vs KotaDB: See the Difference
          </h3>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div>
              <div className="bg-gradient-to-br from-red-900 to-red-950 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-2xl border border-red-800 mx-auto">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-red-400 text-xs sm:text-sm font-medium">
                    grep: Traditional Approach
                  </span>
                </div>
                <div className="overflow-x-auto w-full">
                  <pre className="text-xs sm:text-sm font-[family-name:var(--font-roboto-mono)] whitespace-pre w-full">
                    <code className="text-red-300 block w-full">{`# Find all files containing "FileStorage"
$ grep -r "FileStorage" .
./utils.py:class FileStorage:
./main.py:    # FileStorage comment
./test.py:storage = FileStorage()

# No context, no relationships
# Can't tell which is actual usage
# Manual parsing required
# Slow on large codebases`}</code>
                  </pre>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-2xl border border-slate-800 mx-auto">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-teal-400 text-xs sm:text-sm font-medium">
                    KotaDB: Intelligent Analysis
                  </span>
                  <button className="text-slate-400 hover:text-teal-400 transition-colors duration-200 flex-shrink-0">
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
                    <code className="language-python text-slate-300 block w-full">{`from kotadb import KotaDB

db = KotaDB("http://localhost:8080")
db.ingest_repository(".")

# Find actual callers (not comments!)
callers = db.find_callers("FileStorage")
# Returns: [Function(save_file, utils.py:45), 
#           Function(load_data, main.py:12)]

# Impact analysis shows ripple effects  
impact = db.impact_analysis("FileStorage")
print(f"Changing FileStorage affects:")
for func in impact.affected_functions:
    print(f"  {func.name}() in {func.file}")

# <3ms response time, structured results`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3">
                Symbol Tracking
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                17,128+ symbols extracted from KotaDB&apos;s own codebase
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3">
                Impact Analysis
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Instantly see what breaks when you change code
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-3">
                LLM Ready
              </h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                MCP server for Claude Code and AI assistants
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900 w-full overflow-hidden">
        <div className="w-full max-w-7xl mx-auto">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-slate-50 mb-8 sm:mb-12 md:mb-16 px-2">
            Get Started in Seconds
          </h3>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4 sm:mb-6 flex items-center">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-teal-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                </svg>
                Docker Compose
              </h4>
              <div className="bg-slate-950 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 overflow-x-auto">
                <code className="text-teal-400 text-xs sm:text-sm font-[family-name:var(--font-roboto-mono)] whitespace-nowrap block">
                  docker-compose -f docker-compose.quickstart.yml up -d
                </code>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h4 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4 sm:mb-6 flex items-center">
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
              <div className="bg-slate-950 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 overflow-x-auto">
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
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 w-full">
        <div className="w-full max-w-7xl mx-auto">
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

      {/* CTA Section with Email Capture */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-teal-900 to-slate-950 relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-transparent to-slate-800/10 opacity-30" />
        <div className="w-full max-w-4xl mx-auto text-center relative z-10">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 leading-tight">
            Be First to Experience True Code Intelligence
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-teal-100 mb-8 sm:mb-10 leading-relaxed px-4 sm:px-0">
            Join the waitlist to get early access when we launch. Be among the
            first to give your AI coding assistants the semantic search they
            deserve.
          </p>

          {/* Email Capture for CTA */}
          <div className="max-w-md mx-auto mb-8 px-4 sm:px-0">
            <div className="email-capture-cta">
              <EmailCapture source="cta_section" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4 sm:px-0">
            <Link
              href="https://github.com/jayminwest/kota-db"
              target="_blank"
              className="text-teal-200 hover:text-teal-100 transition-all duration-200 text-sm"
            >
              Explore on GitHub
            </Link>
            <span className="text-teal-300/50 hidden sm:inline">•</span>
            <Link
              href="https://github.com/jayminwest/kota-db#documentation"
              target="_blank"
              className="text-teal-200 hover:text-teal-100 transition-all duration-200 text-sm"
            >
              Read Documentation
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-slate-800 w-full">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                KotaDB
              </h4>
              <p className="text-slate-400">
                Codebase intelligence platform for LLM tooling.
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
