/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Failure injection utilities for anti-mock testing
 * Test with real implementations and controlled failures
 */

export type FailureMode =
  | "none"
  | "timeout"
  | "network-error"
  | "rate-limit"
  | "invalid-response"
  | "intermittent"
  | "slow-response"
  | "partial-failure";

export interface FailureInjectionConfig {
  mode: FailureMode;
  probability?: number; // For intermittent failures
  delayMs?: number; // For slow responses
  errorMessage?: string;
  failAfterCount?: number; // Fail after N successful calls
}

/**
 * Failure injection controller for testing real implementations
 */
export class FailureInjector {
  private callCount = 0;
  protected config: FailureInjectionConfig;

  constructor(config: FailureInjectionConfig = { mode: "none" }) {
    this.config = config;
  }

  /**
   * Set the failure mode
   */
  setMode(mode: FailureMode): void {
    this.config.mode = mode;
    this.callCount = 0;
  }

  /**
   * Reset the injector state
   */
  reset(): void {
    this.callCount = 0;
    this.config = { mode: "none" };
  }

  /**
   * Execute a function with failure injection
   */
  async execute<T>(fn: () => Promise<T>): Promise<T> {
    this.callCount++;

    // Check if we should fail based on call count
    if (
      this.config.failAfterCount &&
      this.callCount > this.config.failAfterCount
    ) {
      this.config.mode = "none"; // Disable after reaching count
    }

    switch (this.config.mode) {
      case "none":
        return fn();

      case "timeout":
        return new Promise((_, reject) => {
          setTimeout(
            () =>
              reject(new Error(this.config.errorMessage || "Request timeout")),
            this.config.delayMs || 100,
          );
        });

      case "network-error":
        throw new Error(
          this.config.errorMessage || "Network error: Connection refused",
        );

      case "rate-limit":
        throw new Error(this.config.errorMessage || "Rate limit exceeded");

      case "invalid-response":
        // Return garbage data to test validation
        return {} as T;

      case "intermittent":
        if (Math.random() < (this.config.probability || 0.5)) {
          throw new Error(this.config.errorMessage || "Intermittent failure");
        }
        return fn();

      case "slow-response":
        await new Promise((resolve) =>
          setTimeout(resolve, this.config.delayMs || 5000),
        );
        return fn();

      case "partial-failure":
        // Simulate partial success (useful for batch operations)
        const result = await fn();
        if (Array.isArray(result)) {
          // Fail half of the items
          return result.map((item, index) =>
            index % 2 === 0 ? item : new Error("Partial failure"),
          ) as T;
        }
        return result;

      default:
        return fn();
    }
  }

  /**
   * Wrap a class method with failure injection
   */
  wrapMethod<T extends object>(
    target: T,
    methodName: keyof T,
    config?: FailureInjectionConfig,
  ): void {
    const originalMethod = target[methodName] as any;
    if (config) {
      this.config = config;
    }

    (target[methodName] as any) = async (...args: any[]) => {
      return this.execute(() => originalMethod.apply(target, args));
    };
  }
}

/**
 * Database failure injector for testing database operations
 */
export class DatabaseFailureInjector extends FailureInjector {
  /**
   * Simulate connection pool exhaustion
   */
  simulatePoolExhaustion(): void {
    this.setMode("timeout");
    this.config.errorMessage = "Connection pool exhausted";
    this.config.delayMs = 30000;
  }

  /**
   * Simulate deadlock
   */
  simulateDeadlock(): void {
    this.setMode("network-error");
    this.config.errorMessage = "Deadlock detected";
  }

  /**
   * Simulate replication lag
   */
  simulateReplicationLag(delayMs = 5000): void {
    this.setMode("slow-response");
    this.config.delayMs = delayMs;
  }

  /**
   * Simulate transaction rollback
   */
  simulateTransactionRollback(): void {
    this.setMode("network-error");
    this.config.errorMessage = "Transaction rolled back";
  }
}

/**
 * API failure injector for testing API operations
 */
export class ApiFailureInjector extends FailureInjector {
  /**
   * Simulate 429 Too Many Requests
   */
  simulate429(): void {
    this.setMode("rate-limit");
    this.config.errorMessage = "429 Too Many Requests";
  }

  /**
   * Simulate 503 Service Unavailable
   */
  simulate503(): void {
    this.setMode("network-error");
    this.config.errorMessage = "503 Service Unavailable";
  }

  /**
   * Simulate flaky API with intermittent failures
   */
  simulateFlakyApi(failureRate = 0.3): void {
    this.setMode("intermittent");
    this.config.probability = failureRate;
    this.config.errorMessage = "API request failed";
  }

  /**
   * Simulate slow API response
   */
  simulateSlowApi(delayMs = 10000): void {
    this.setMode("slow-response");
    this.config.delayMs = delayMs;
  }
}

/**
 * Chaos testing orchestrator
 */
export class ChaosOrchestrator {
  private injectors: Map<string, FailureInjector> = new Map();

  /**
   * Register a failure injector
   */
  register(name: string, injector: FailureInjector): void {
    this.injectors.set(name, injector);
  }

  /**
   * Run a chaos scenario
   */
  async runScenario(scenario: {
    name: string;
    description: string;
    setup: () => void;
    test: () => Promise<void>;
    cleanup?: () => void;
  }): Promise<void> {
    console.log(`Running chaos scenario: ${scenario.name}`);

    console.log(`Description: ${scenario.description}`);

    try {
      scenario.setup();
      await scenario.test();
    } finally {
      scenario.cleanup?.();
      this.resetAll();
    }
  }

  /**
   * Reset all injectors
   */
  resetAll(): void {
    this.injectors.forEach((injector) => injector.reset());
  }

  /**
   * Create a cascade failure scenario
   */
  createCascadeFailure(components: string[], delayBetweenMs = 1000): void {
    components.forEach((component, index) => {
      setTimeout(() => {
        const injector = this.injectors.get(component);
        if (injector) {
          injector.setMode("network-error");
        }
      }, index * delayBetweenMs);
    });
  }
}
