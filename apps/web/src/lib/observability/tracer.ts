/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Distributed tracing implementation for observability
 */

import { logger } from "./logger";

export interface Span {
  traceId: string;
  spanId: string;
  parentSpanId?: string;
  operationName: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  tags: Record<string, any>;
  logs: Array<{
    timestamp: number;
    message: string;
    fields?: Record<string, any>;
  }>;
  status: "ok" | "error" | "cancelled";
}

export interface TraceContext {
  traceId: string;
  spanId: string;
  baggage?: Record<string, string>;
}

/**
 * Tracer for distributed tracing
 */
export class Tracer {
  private static instance: Tracer;
  private activeSpans = new Map<string, Span>();
  private completedSpans: Span[] = [];

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): Tracer {
    if (!Tracer.instance) {
      Tracer.instance = new Tracer();
    }
    return Tracer.instance;
  }

  /**
   * Generate a unique ID
   */
  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  /**
   * Start a new trace
   */
  startTrace(operationName: string, tags?: Record<string, any>): TraceContext {
    const traceId = this.generateId();
    const spanId = this.generateId();

    const span: Span = {
      traceId,
      spanId,
      operationName,
      startTime: Date.now(),
      tags: tags || {},
      logs: [],
      status: "ok",
    };

    this.activeSpans.set(spanId, span);

    // Set logger context
    logger.setGlobalContext({ traceId, spanId });

    logger.info(`Trace started: ${operationName}`, { traceId, spanId });

    return { traceId, spanId };
  }

  /**
   * Start a child span
   */
  startSpan(
    operationName: string,
    parentContext: TraceContext,
    tags?: Record<string, any>,
  ): TraceContext {
    const spanId = this.generateId();

    const span: Span = {
      traceId: parentContext.traceId,
      spanId,
      parentSpanId: parentContext.spanId,
      operationName,
      startTime: Date.now(),
      tags: tags || {},
      logs: [],
      status: "ok",
    };

    this.activeSpans.set(spanId, span);

    logger.debug(`Span started: ${operationName}`, {
      traceId: parentContext.traceId,
      spanId,
      parentSpanId: parentContext.spanId,
    });

    return {
      traceId: parentContext.traceId,
      spanId,
      baggage: parentContext.baggage || {},
    };
  }

  /**
   * Add a tag to a span
   */
  addTag(spanId: string, key: string, value: any): void {
    const span = this.activeSpans.get(spanId);
    if (span) {
      span.tags[key] = value;
    }
  }

  /**
   * Add a log to a span
   */
  addLog(spanId: string, message: string, fields?: Record<string, any>): void {
    const span = this.activeSpans.get(spanId);
    if (span) {
      span.logs.push({
        timestamp: Date.now(),
        message,
        fields: fields || {},
      });
    }
  }

  /**
   * Mark a span as errored
   */
  setError(spanId: string, error: Error): void {
    const span = this.activeSpans.get(spanId);
    if (span) {
      span.status = "error";
      span.tags["error"] = true;
      span.tags["errorMessage"] = error.message;
      span.tags["errorStack"] = error.stack;
      this.addLog(spanId, "Error occurred", {
        error: error.message,
        stack: error.stack,
      });
    }
  }

  /**
   * Finish a span
   */
  finishSpan(spanId: string): void {
    const span = this.activeSpans.get(spanId);
    if (span) {
      span.endTime = Date.now();
      span.duration = span.endTime - span.startTime;

      logger.debug(`Span finished: ${span.operationName}`, {
        traceId: span.traceId,
        spanId: span.spanId,
        duration: span.duration,
        status: span.status,
      });

      this.activeSpans.delete(spanId);
      this.completedSpans.push(span);

      // In production, send to tracing backend
      if (process.env.NODE_ENV === "production") {
        this.sendToBackend(span);
      }
    }
  }

  /**
   * Wrap a function with tracing
   */
  async trace<T>(
    operationName: string,
    fn: (context: TraceContext) => Promise<T>,
    parentContext?: TraceContext,
    tags?: Record<string, any>,
  ): Promise<T> {
    const context = parentContext
      ? this.startSpan(operationName, parentContext, tags)
      : this.startTrace(operationName, tags);

    try {
      const result = await fn(context);
      this.finishSpan(context.spanId);
      return result;
    } catch (error) {
      this.setError(context.spanId, error as Error);
      this.finishSpan(context.spanId);
      throw error;
    }
  }

  /**
   * Send span to backend (stub for production)
   */
  private sendToBackend(span: Span): void {
    // In production, this would send to Jaeger, Zipkin, etc.
    // For now, just log it
    logger.debug("Sending span to backend", { span });
  }

  /**
   * Get all completed spans (for testing)
   */
  getCompletedSpans(): Span[] {
    return this.completedSpans;
  }

  /**
   * Reset tracer (for testing)
   */
  reset(): void {
    this.activeSpans.clear();
    this.completedSpans = [];
  }
}

/**
 * Default tracer instance
 */
export const tracer = Tracer.getInstance();

/**
 * Decorator for tracing class methods
 */
export function Trace(operationName?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const name = operationName || `${target.constructor.name}.${propertyKey}`;
      return tracer.trace(name, async () => {
        return originalMethod.apply(this, args);
      });
    };

    return descriptor;
  };
}
