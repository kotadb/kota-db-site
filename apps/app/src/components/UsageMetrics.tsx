"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { UsageMetric } from "@kotadb/shared";

interface UsageMetricsProps {
  userId: string;
}

export default function UsageMetrics({ userId }: UsageMetricsProps) {
  const [metrics, setMetrics] = useState<UsageMetric[]>([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({
    totalQueries: 0,
    totalContext: 0,
    totalStorage: 0,
    monthlyQueries: 0,
  });

  useEffect(() => {
    if (userId) {
      fetchMetrics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const fetchMetrics = async () => {
    try {
      // Get last 30 days of metrics
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data, error } = await supabase
        .from("usage_metrics")
        .select("*")
        .eq("user_id", userId)
        .gte("date", thirtyDaysAgo.toISOString().split("T")[0])
        .order("date", { ascending: false });

      if (error) throw error;

      const metricsData = data || [];
      setMetrics(metricsData);

      // Calculate summary
      const totals = metricsData.reduce(
        (acc, metric) => ({
          totalQueries: acc.totalQueries + metric.queries_count,
          totalContext: acc.totalContext + parseFloat(metric.context_saved_mb),
          totalStorage: Math.max(
            acc.totalStorage,
            parseFloat(metric.storage_used_mb),
          ),
          monthlyQueries: acc.monthlyQueries + metric.queries_count,
        }),
        {
          totalQueries: 0,
          totalContext: 0,
          totalStorage: 0,
          monthlyQueries: 0,
        },
      );

      setSummary(totals);
    } catch (error) {
      console.error("Error fetching usage metrics:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const formatMB = (mb: number) => {
    if (mb < 1024) {
      return `${mb.toFixed(2)} MB`;
    }
    return `${(mb / 1024).toFixed(2)} GB`;
  };

  if (loading) {
    return <div className="text-center py-8">Loading usage metrics...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Usage Metrics
        </h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Monthly Queries
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatNumber(summary.monthlyQueries)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            / 10,000 limit
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Total Queries
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatNumber(summary.totalQueries)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            All time
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Context Saved
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatMB(summary.totalContext)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            This month
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Storage Used
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatMB(summary.totalStorage)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Current
          </p>
        </div>
      </div>

      {/* Daily Metrics Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Daily Usage (Last 30 Days)
          </h3>
        </div>

        {metrics.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No usage data available yet. Start using KotaDB to see your metrics.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Queries
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Context Saved
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Storage
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {metrics.map((metric) => (
                  <tr
                    key={metric.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {new Date(metric.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {formatNumber(metric.queries_count)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {formatMB(parseFloat(metric.context_saved_mb))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                      {formatMB(parseFloat(metric.storage_used_mb))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
