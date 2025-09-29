import Link from "next/link";
import { layout } from "@kotadb/shared";

export function SiteFooter() {
  return (
    <footer className="py-16 bg-[var(--background-secondary)] border-t border-[var(--border)] w-full">
      <div className={layout.container}>
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              KotaDB
            </h4>
            <p className="text-[var(--foreground-secondary)]">
              Hosted knowledge graph powering Claude, Codex, and every
              agent-native workflow.
            </p>
          </div>
          <div>
            <h5 className="text-[var(--accent)] font-semibold mb-4 uppercase tracking-wider text-sm">
              Resources
            </h5>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://github.com/kotadb/kota-db#documentation"
                  target="_blank"
                  className="text-[var(--foreground-secondary)] hover:text-teal-400 transition-colors duration-200"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/kotadb/kota-db#quickstart"
                  target="_blank"
                  className="text-[var(--foreground-secondary)] hover:text-teal-400 transition-colors duration-200"
                >
                  Quick Start
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/kotadb/kota-db/blob/main/examples"
                  target="_blank"
                  className="text-[var(--foreground-secondary)] hover:text-teal-400 transition-colors duration-200"
                >
                  Examples
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-[var(--foreground)] font-semibold mb-4">
              Community
            </h5>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://github.com/kotadb/kota-db"
                  target="_blank"
                  className="text-[var(--foreground-secondary)] hover:text-teal-400 transition-colors duration-200"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/kotadb/kota-db/issues"
                  target="_blank"
                  className="text-[var(--foreground-secondary)] hover:text-teal-400 transition-colors duration-200"
                >
                  Issues
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/kotadb/kota-db/discussions"
                  target="_blank"
                  className="text-[var(--foreground-secondary)] hover:text-teal-400 transition-colors duration-200"
                >
                  Discussions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-[var(--foreground)] font-semibold mb-4">
              Connect
            </h5>
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
                  href="https://github.com/kotadb/kota-db/blob/main/LICENSE"
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
            &copy; 2025 KotaDB. Built with passion for the future of knowledge
            work.
          </p>
        </div>
      </div>
    </footer>
  );
}
