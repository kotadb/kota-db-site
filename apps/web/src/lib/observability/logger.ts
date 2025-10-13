/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Structured logging system for comprehensive observability
 */

export type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal";

export interface LogContext {
  traceId?: string;
  spanId?: string;
  userId?: string;
  requestId?: string;
  service?: string;
  component?: string;
  [key: string]: any;
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context: LogContext;
  error?: Error;
  duration?: number;
  metadata?: Record<string, any>;
}

/**
 * Structured logger implementation
 */
export class StructuredLogger {
  private static instance: StructuredLogger;
  private context: LogContext = {};
  private logLevel: LogLevel = "info";

  private constructor() {
    this.logLevel = (process.env.LOG_LEVEL as LogLevel) || "info";
  }

  /**
   * Get singleton instance
   */
  static getInstance(): StructuredLogger {
    if (!StructuredLogger.instance) {
      StructuredLogger.instance = new StructuredLogger();
    }
    return StructuredLogger.instance;
  }

  /**
   * Set global context that will be included in all logs
   */
  setGlobalContext(context: LogContext): void {
    this.context = { ...this.context, ...context };
  }

  /**
   * Create a child logger with additional context
   */
  child(context: LogContext): StructuredLogger {
    const childLogger = Object.create(this);
    childLogger.context = { ...this.context, ...context };
    return childLogger;
  }

  /**
   * Check if a log level should be logged
   */
  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = [
      "trace",
      "debug",
      "info",
      "warn",
      "error",
      "fatal",
    ];
    return levels.indexOf(level) >= levels.indexOf(this.logLevel);
  }

  /**
   * Format and output log entry
   */
  private output(entry: LogEntry): void {
    if (!this.shouldLog(entry.level)) return;

    const formattedEntry = {
      ...entry,
      context: { ...this.context, ...entry.context },
    };

    // In production, this would send to a log aggregation service
    if (process.env.NODE_ENV === "production") {
      // Send to log aggregation service

      console.log(JSON.stringify(formattedEntry));
    } else {
      // Development-friendly output
      const color = this.getColor(entry.level);

      console.log(
        `${color}[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}`,
        formattedEntry.context,
        formattedEntry.metadata || "",
      );
      if (entry.error) {
        console.error(entry.error);
      }
    }
  }

  /**
   * Get color for log level (for development)
   */
  private getColor(level: LogLevel): string {
    const colors = {
      trace: "\x1b[90m", // Gray
      debug: "\x1b[36m", // Cyan
      info: "\x1b[32m", // Green
      warn: "\x1b[33m", // Yellow
      error: "\x1b[31m", // Red
      fatal: "\x1b[35m", // Magenta
    };
    return colors[level] || "";
  }

  /**
   * Log methods
   */
  trace(message: string, metadata?: Record<string, any>): void {
    this.log("trace", message, metadata);
  }

  debug(message: string, metadata?: Record<string, any>): void {
    this.log("debug", message, metadata);
  }

  info(message: string, metadata?: Record<string, any>): void {
    this.log("info", message, metadata);
  }

  warn(message: string, metadata?: Record<string, any>): void {
    this.log("warn", message, metadata);
  }

  error(
    message: string,
    error?: Error | Record<string, any>,
    metadata?: Record<string, any>,
  ): void {
    if (error instanceof Error) {
      this.output({
        timestamp: new Date().toISOString(),
        level: "error",
        message,
        context: this.context,
        error,
        metadata: metadata || {},
      });
    } else {
      this.log("error", message, error);
    }
  }

  fatal(message: string, error?: Error, metadata?: Record<string, any>): void {
    this.output({
      timestamp: new Date().toISOString(),
      level: "fatal",
      message,
      context: this.context,
      error: error || new Error(message),
      metadata: metadata || {},
    });
  }

  /**
   * Generic log method
   */
  private log(
    level: LogLevel,
    message: string,
    metadata?: Record<string, any>,
  ): void {
    this.output({
      timestamp: new Date().toISOString(),
      level,
      message,
      context: this.context,
      metadata: metadata || {},
    });
  }

  /**
   * Log a timed operation
   */
  time(label: string): () => void {
    const start = Date.now();
    return () => {
      const duration = Date.now() - start;
      this.info(`${label} completed`, { duration });
    };
  }

  /**
   * Log an async operation with timing
   */
  async timeAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    const start = Date.now();
    try {
      const result = await fn();
      const duration = Date.now() - start;
      this.info(`${label} completed`, { duration });
      return result;
    } catch (error) {
      const duration = Date.now() - start;
      this.error(`${label} failed`, error as Error, { duration });
      throw error;
    }
  }
}

/**
 * Default logger instance
 */
export const logger = StructuredLogger.getInstance();
