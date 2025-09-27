"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { HealthCheckCard } from "@/components/health/HealthCheckCard";
import { getSupabase } from "@/lib/supabase";

type HealthStatus = "unknown" | "healthy" | "degraded" | "down";

interface HealthCheckTemplate {
  name: string;
  description: string;
  status: HealthStatus;
  category: "core" | "jobs" | "integrations";
}

const TEMPLATE_CHECKS: HealthCheckTemplate[] = [
  {
    name: "Supabase Postgres",
    description:
      "Live database connectivity, migrations, and read/write latency.",
    status: "unknown",
    category: "core",
  },
  {
    name: "Fly.io API",
    description:
      "Health of the KotaDB application API running on Fly.io, including MCP endpoints.",
    status: "unknown",
    category: "core",
  },
  {
    name: "Backend Workers",
    description:
      "Repository ingestion workers, queue depth, and recent failure counts.",
    status: "unknown",
    category: "jobs",
  },
  {
    name: "Provisioning Queue",
    description:
      "Stripe webhook processing, Supabase provisioning, and retry backlog.",
    status: "unknown",
    category: "jobs",
  },
  {
    name: "Stripe",
    description:
      "Checkout session creation, billing portal access, and webhook delivery.",
    status: "unknown",
    category: "integrations",
  },
  {
    name: "GitHub OAuth",
    description:
      "Authorization, callback handling, and repo access token validation.",
    status: "unknown",
    category: "integrations",
  },
];

export const dynamic = "force-dynamic";

export default function AdminHealthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const verifySession = async () => {
      const {
        data: { session },
      } = await getSupabase().auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      setUserEmail(session.user.email ?? null);
      setLoading(false);
    };

    void verifySession();

    const { data: authListener } = getSupabase().auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          router.push("/login");
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const summary = useMemo(() => {
    const total = TEMPLATE_CHECKS.length;
    const placeholder = {
      healthy: 0,
      degraded: 0,
      down: 0,
      unknown: total,
    } as Record<HealthStatus, number>;

    return placeholder;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Preparing admin diagnostics…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Platform Health Overview
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Real-time diagnostics for core backend services, job workers,
                and third-party integrations.
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span className="hidden sm:inline">
                Signed in as {userEmail ?? "admin"}
              </span>
              <button
                type="button"
                disabled
                className="inline-flex items-center rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400"
              >
                Refresh all checks (pending)
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Services monitored
            </p>
            <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">
              {TEMPLATE_CHECKS.length}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Healthy
            </p>
            <p className="mt-2 text-3xl font-semibold text-emerald-500">
              {summary.healthy}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Investigate
            </p>
            <p className="mt-2 text-3xl font-semibold text-amber-500">
              {summary.degraded}
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Not yet wired
            </p>
            <p className="mt-2 text-3xl font-semibold text-gray-500">
              {summary.unknown}
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Core services
            </h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Objective: ensure primary datastore and API are responsive.
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {TEMPLATE_CHECKS.filter((check) => check.category === "core").map(
              (check) => (
                <HealthCheckCard
                  key={check.name}
                  name={check.name}
                  description={check.description}
                  status={check.status}
                />
              ),
            )}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Background jobs & queues
            </h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Track ingestion workers, provisioning, and retry pipelines.
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {TEMPLATE_CHECKS.filter((check) => check.category === "jobs").map(
              (check) => (
                <HealthCheckCard
                  key={check.name}
                  name={check.name}
                  description={check.description}
                  status={check.status}
                />
              ),
            )}
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Third-party integrations
            </h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Validate credentials, API quotas, and webhook delivery.
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {TEMPLATE_CHECKS.filter(
              (check) => check.category === "integrations",
            ).map((check) => (
              <HealthCheckCard
                key={check.name}
                name={check.name}
                description={check.description}
                status={check.status}
              />
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-gray-800/50 p-6 text-sm text-gray-600 dark:text-gray-400">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white">
            Implementation notes
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              Once backend health endpoints are published, wire them into an API
              route (e.g. `/api/admin/health`) that aggregates results.
            </li>
            <li>
              Capture timestamp, status enum, latency, and a troubleshooting
              message for each service.
            </li>
            <li>
              Consider persisting a short rolling history to surface flapping
              behaviour or cron lapses.
            </li>
            <li>
              Gate this route behind role-based access control when admin auth
              is available.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
