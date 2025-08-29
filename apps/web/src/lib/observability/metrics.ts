/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Metrics collection for comprehensive observability
 */

export type MetricType = "counter" | "gauge" | "histogram" | "summary";

export interface Metric {
  name: string;
  type: MetricType;
  value: number;
  timestamp: number;
  tags?: Record<string, string>;
}

export interface HistogramMetric extends Metric {
  type: "histogram";
  buckets: number[];
  values: number[];
}

/**
 * Metrics collector
 */
export class MetricsCollector {
  private static instance: MetricsCollector;
  private metrics = new Map<string, Metric[]>();
  private histograms = new Map<string, number[]>();

  private constructor() {
    // Start periodic flush
    if (process.env.NODE_ENV === "production") {
      setInterval(() => this.flush(), 60000); // Flush every minute
    }
  }

  /**
   * Get singleton instance
   */
  static getInstance(): MetricsCollector {
    if (!MetricsCollector.instance) {
      MetricsCollector.instance = new MetricsCollector();
    }
    return MetricsCollector.instance;
  }

  /**
   * Increment a counter
   */
  increment(name: string, value = 1, tags?: Record<string, string>): void {
    this.record({
      name,
      type: "counter",
      value,
      timestamp: Date.now(),
      tags: tags || {},
    });
  }

  /**
   * Set a gauge value
   */
  gauge(name: string, value: number, tags?: Record<string, string>): void {
    this.record({
      name,
      type: "gauge",
      value,
      timestamp: Date.now(),
      tags: tags || {},
    });
  }

  /**
   * Record a histogram value
   */
  histogram(name: string, value: number, tags?: Record<string, string>): void {
    // Store raw values
    if (!this.histograms.has(name)) {
      this.histograms.set(name, []);
    }
    this.histograms.get(name)?.push(value);

    // Calculate percentiles periodically
    this.record({
      name,
      type: "histogram",
      value,
      timestamp: Date.now(),
      tags: tags || {},
    });
  }

  /**
   * Record a timing
   */
  timing(name: string, duration: number, tags?: Record<string, string>): void {
    this.histogram(`${name}.duration`, duration, tags);
  }

  /**
   * Time a function execution
   */
  async time<T>(
    name: string,
    fn: () => Promise<T>,
    tags?: Record<string, string>,
  ): Promise<T> {
    const start = Date.now();
    try {
      const result = await fn();
      this.timing(name, Date.now() - start, { ...tags, status: "success" });
      return result;
    } catch (error) {
      this.timing(name, Date.now() - start, { ...tags, status: "error" });
      throw error;
    }
  }

  /**
   * Record a metric
   */
  private record(metric: Metric): void {
    const key = this.getMetricKey(metric);
    if (!this.metrics.has(key)) {
      this.metrics.set(key, []);
    }
    this.metrics.get(key)?.push(metric);
  }

  /**
   * Get metric key for grouping
   */
  private getMetricKey(metric: Metric): string {
    const tags = metric.tags ? JSON.stringify(metric.tags) : "";
    return `${metric.name}:${metric.type}:${tags}`;
  }

  /**
   * Calculate percentiles for histograms
   */
  private calculatePercentiles(values: number[]): Record<string, number> {
    if (values.length === 0) return {};

    const sorted = values.sort((a, b) => a - b);
    const percentiles = [50, 75, 90, 95, 99];
    const result: Record<string, number> = {};

    for (const p of percentiles) {
      const index = Math.ceil((p / 100) * sorted.length) - 1;
      result[`p${p}`] = sorted[index] || 0;
    }

    result["min"] = sorted[0] || 0;
    result["max"] = sorted[sorted.length - 1] || 0;
    result["count"] = values.length;
    result["sum"] = values.reduce((a, b) => a + b, 0);
    result["avg"] = result["sum"] / result["count"];

    return result;
  }

  /**
   * Get current metrics snapshot
   */
  getSnapshot(): Record<string, any> {
    const snapshot: Record<string, any> = {};

    // Process regular metrics
    for (const [key, metrics] of this.metrics.entries()) {
      if (metrics.length === 0) continue;

      const latestMetric = metrics[metrics.length - 1];
      if (latestMetric?.type === "counter") {
        snapshot[key] = metrics.reduce((sum, m) => sum + m.value, 0);
      } else if (latestMetric?.type === "gauge") {
        snapshot[key] = latestMetric.value;
      }
    }

    // Process histograms
    for (const [name, values] of this.histograms.entries()) {
      if (values.length > 0) {
        snapshot[`${name}.histogram`] = this.calculatePercentiles(values);
      }
    }

    return snapshot;
  }

  /**
   * Flush metrics to backend
   */
  private flush(): void {
    const snapshot = this.getSnapshot();

    // In production, send to metrics backend (Prometheus, DataDog, etc.)
    if (process.env.NODE_ENV === "production") {
      console.log("Flushing metrics:", snapshot);
    }

    // Clear old data
    this.metrics.clear();
    this.histograms.clear();
  }

  /**
   * Reset metrics (for testing)
   */
  reset(): void {
    this.metrics.clear();
    this.histograms.clear();
  }
}

/**
 * Default metrics collector
 */
export const metrics = MetricsCollector.getInstance();

/**
 * Decorator for metric collection
 */
export function Metric(name?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const metricName = name || `${target.constructor.name}.${propertyKey}`;

      metrics.increment(`${metricName}.calls`);

      return metrics.time(metricName, async () => {
        return originalMethod.apply(this, args);
      });
    };

    return descriptor;
  };
}
