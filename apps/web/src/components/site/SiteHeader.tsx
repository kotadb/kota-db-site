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
    <nav className="fixed top-0 w-full backdrop-blur-xl bg-[var(--background)]/80 z-50 border-b border-[var(--border)]/50">
      <div className={layout.container}>
        <div className="flex justify-between items-center h-20 max-w-7xl mx-auto">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-bold text-[var(--foreground)]">
                KotaDB
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            {links.length > 0 && (
              <div className="hidden md:flex items-center space-x-8">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors duration-200 text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link
                href={ctaHref}
                className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-sm"
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
