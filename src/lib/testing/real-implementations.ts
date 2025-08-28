/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Real implementation wrappers for testing
 * These provide actual functionality with failure injection capabilities
 */

import { FailureInjector } from "./failure-injection";

/**
 * Real file system implementation for testing
 */
export class TestFileSystem {
  private injector = new FailureInjector();
  private files = new Map<string, string>();

  /**
   * Write a file
   */
  async writeFile(path: string, content: string): Promise<void> {
    return this.injector.execute(async () => {
      this.files.set(path, content);
    });
  }

  /**
   * Read a file
   */
  async readFile(path: string): Promise<string> {
    return this.injector.execute(async () => {
      const content = this.files.get(path);
      if (!content) {
        throw new Error(`File not found: ${path}`);
      }
      return content;
    });
  }

  /**
   * Delete a file
   */
  async deleteFile(path: string): Promise<void> {
    return this.injector.execute(async () => {
      if (!this.files.has(path)) {
        throw new Error(`File not found: ${path}`);
      }
      this.files.delete(path);
    });
  }

  /**
   * Check if file exists
   */
  async exists(path: string): Promise<boolean> {
    return this.injector.execute(async () => {
      return this.files.has(path);
    });
  }

  /**
   * Enable failure injection
   */
  injectFailure(mode: Parameters<typeof this.injector.setMode>[0]): void {
    this.injector.setMode(mode);
  }

  /**
   * Reset the file system
   */
  reset(): void {
    this.files.clear();
    this.injector.reset();
  }
}

/**
 * Real HTTP client implementation for testing
 */
export class TestHttpClient {
  private injector = new FailureInjector();
  private mockResponses = new Map<string, any>();

  /**
   * Make a GET request
   */
  async get(url: string): Promise<any> {
    return this.injector.execute(async () => {
      // Check for mock response first
      if (this.mockResponses.has(url)) {
        return this.mockResponses.get(url);
      }

      // Make real HTTP request (in test environment, this might hit a test server)
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    });
  }

  /**
   * Make a POST request
   */
  async post(url: string, data: any): Promise<any> {
    return this.injector.execute(async () => {
      // Check for mock response first
      if (this.mockResponses.has(url)) {
        return this.mockResponses.get(url);
      }

      // Make real HTTP request
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    });
  }

  /**
   * Set a mock response for testing
   */
  setMockResponse(url: string, response: any): void {
    this.mockResponses.set(url, response);
  }

  /**
   * Enable failure injection
   */
  injectFailure(mode: Parameters<typeof this.injector.setMode>[0]): void {
    this.injector.setMode(mode);
  }

  /**
   * Reset the client
   */
  reset(): void {
    this.mockResponses.clear();
    this.injector.reset();
  }
}

/**
 * Real cache implementation for testing
 */
export class TestCache {
  private injector = new FailureInjector();
  private cache = new Map<string, { value: any; expiresAt: number }>();

  /**
   * Set a cache value
   */
  async set(key: string, value: any, ttlMs = 60000): Promise<void> {
    return this.injector.execute(async () => {
      this.cache.set(key, {
        value,
        expiresAt: Date.now() + ttlMs,
      });
    });
  }

  /**
   * Get a cache value
   */
  async get(key: string): Promise<any> {
    return this.injector.execute(async () => {
      const entry = this.cache.get(key);
      if (!entry) {
        return null;
      }

      if (Date.now() > entry.expiresAt) {
        this.cache.delete(key);
        return null;
      }

      return entry.value;
    });
  }

  /**
   * Delete a cache entry
   */
  async delete(key: string): Promise<void> {
    return this.injector.execute(async () => {
      this.cache.delete(key);
    });
  }

  /**
   * Clear the cache
   */
  async clear(): Promise<void> {
    return this.injector.execute(async () => {
      this.cache.clear();
    });
  }

  /**
   * Enable failure injection
   */
  injectFailure(mode: Parameters<typeof this.injector.setMode>[0]): void {
    this.injector.setMode(mode);
  }

  /**
   * Reset the cache
   */
  reset(): void {
    this.cache.clear();
    this.injector.reset();
  }
}

/**
 * Real queue implementation for testing
 */
export class TestQueue {
  private injector = new FailureInjector();
  private queue: any[] = [];
  private processing = false;
  private handlers = new Map<string, (job: any) => Promise<void>>();

  /**
   * Add a job to the queue
   */
  async enqueue(type: string, data: any): Promise<void> {
    return this.injector.execute(async () => {
      this.queue.push({ type, data, timestamp: Date.now() });
      if (!this.processing) {
        this.process();
      }
    });
  }

  /**
   * Register a job handler
   */
  onJob(type: string, handler: (job: any) => Promise<void>): void {
    this.handlers.set(type, handler);
  }

  /**
   * Process the queue
   */
  private async process(): Promise<void> {
    this.processing = true;

    while (this.queue.length > 0) {
      const job = this.queue.shift();
      if (!job) continue;

      const handler = this.handlers.get(job.type);
      if (handler) {
        try {
          await this.injector.execute(() => handler(job.data));
        } catch (error) {
          console.error(`Job failed: ${job.type}`, error);
          // In real implementation, might retry or move to DLQ
        }
      }
    }

    this.processing = false;
  }

  /**
   * Get queue size
   */
  getSize(): number {
    return this.queue.length;
  }

  /**
   * Enable failure injection
   */
  injectFailure(mode: Parameters<typeof this.injector.setMode>[0]): void {
    this.injector.setMode(mode);
  }

  /**
   * Reset the queue
   */
  reset(): void {
    this.queue = [];
    this.processing = false;
    this.handlers.clear();
    this.injector.reset();
  }
}
