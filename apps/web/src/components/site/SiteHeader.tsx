"use client";

import Link from "next/link";
import { layout } from "@kotadb/shared";
import { ThemeToggle } from "@/components/ui";

const DASHBOARD_URL =
  process.env.NEXT_PUBLIC_DASHBOARD_URL || "https://app.kotadb.io";

export interface SiteHeaderLink {
  href: string;
  label: string;
  external?: boolean;
}

interface SiteHeaderProps {
  links?: SiteHeaderLink[];
  ctaLabel?: string;
  ctaHref?: string;
}

const defaultLinks: SiteHeaderLink[] = [
  {
    href: "/pricing",
    label: "Pricing",
  },
  {
    href: "https://github.com/kotadb/kota-db#documentation",
    label: "Documentation",
    external: true,
  },
  {
    href: "https://github.com/kotadb/kota-db",
    label: "GitHub",
    external: true,
  },
];

export function SiteHeader({
  links = defaultLinks,
  ctaLabel = "Get Started",
  ctaHref = `${DASHBOARD_URL}/login`,
}: SiteHeaderProps) {
  return (
    <nav className="fixed top-0 w-full backdrop-blur-xl bg-[var(--background)]/70 z-50 border-b border-[var(--border)]/30">
      <div className={layout.container}>
        <div className="flex justify-between items-center h-20 max-w-7xl mx-auto">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-hover)] rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300">
                KotaDB
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            {links.length > 0 && (
              <div className="hidden md:flex items-center space-x-10">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className="text-[var(--foreground-secondary)] hover:text-[var(--accent)] transition-colors duration-300 text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-5">
              <ThemeToggle />
              <Link
                href={ctaHref}
                className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-7 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm"
              >
                {ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
