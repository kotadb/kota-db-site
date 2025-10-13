"use client";

import type { ReactNode } from "react";

type HealthStatus = "unknown" | "healthy" | "degraded" | "down";

interface HealthCheckCardProps {
  name: string;
  description: string;
  status?: HealthStatus;
  lastChecked?: string | null;
  actions?: ReactNode;
}

const STATUS_STYLES: Record<HealthStatus, string> = {
  unknown: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200",
  healthy:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  degraded:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  down: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
};

const STATUS_LABEL: Record<HealthStatus, string> = {
  unknown: "Unknown",
  healthy: "Healthy",
  degraded: "Degraded",
  down: "Down",
};

export function HealthCheckCard({
  name,
  description,
  status = "unknown",
  lastChecked,
  actions,
}: HealthCheckCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden">
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {name}
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
          >
            {STATUS_LABEL[status]}
          </span>
        </div>

        <div className="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-4 text-sm text-gray-600 dark:text-gray-400">
          <p className="font-medium text-gray-700 dark:text-gray-300">
            Check results
          </p>
          <p className="mt-1">
            Health checks have not been implemented yet. Once backend endpoints
            are available, this card will display the latest status and
            diagnostics.
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Last checked: {lastChecked ? lastChecked : "Not yet run"}</span>
          <div className="flex items-center gap-3">
            {actions}
            {!actions && (
              <button
                type="button"
                disabled
                className="inline-flex items-center rounded-lg border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400"
              >
                Run check (pending)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
