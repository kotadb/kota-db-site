import { z } from "zod";

/**
 * API Client configuration schema
 */
const ApiClientConfigSchema = z.object({
  baseURL: z.string(),
  timeout: z.number().int().positive().default(30000),
  retries: z.number().int().min(0).max(5).default(3),
  headers: z.record(z.string(), z.string()).default({}),
  interceptors: z
    .object({
      request: z.array(z.any()).default([]),
      response: z.array(z.any()).default([]),
      error: z.array(z.any()).default([]),
    })
    .default({
      request: [],
      response: [],
      error: [],
    }),
  rateLimit: z
    .object({
      maxRequests: z.number().int().positive().default(100),
      perMilliseconds: z.number().int().positive().default(60000),
    })
    .optional(),
  cache: z
    .object({
      enabled: z.boolean().default(false),
      ttl: z.number().int().positive().default(300000),
      maxSize: z.number().int().positive().default(100),
    })
    .optional(),
});

type ApiClientConfig = z.infer<typeof ApiClientConfigSchema>;

/**
 * Fluent builder for API client configuration
 * Guides users toward correct configuration with sensible defaults
 */
export class ApiClientBuilder {
  private config: Partial<ApiClientConfig> = {
    headers: {},
    interceptors: {
      request: [],
      response: [],
      error: [],
    },
  };

  /**
   * Set the base URL for API requests
   */
  withBaseURL(url: string): this {
    this.config.baseURL = url;
    return this;
  }

  /**
   * Set request timeout in milliseconds
   */
  withTimeout(milliseconds: number): this {
    this.config.timeout = milliseconds;
    return this;
  }

  /**
   * Configure automatic retry behavior
   */
  withRetries(count: number): this {
    this.config.retries = count;
    return this;
  }

  /**
   * Add a default header
   */
  withHeader(key: string, value: string): this {
    if (!this.config.headers) {
      this.config.headers = {};
    }
    this.config.headers[key] = value;
    return this;
  }

  /**
   * Add multiple headers
   */
  withHeaders(headers: Record<string, string>): this {
    this.config.headers = { ...this.config.headers, ...headers };
    return this;
  }

  /**
   * Add bearer token authentication
   */
  withBearerToken(token: string): this {
    return this.withHeader("Authorization", `Bearer ${token}`);
  }

  /**
   * Add API key authentication
   */
  withApiKey(key: string, headerName = "X-API-Key"): this {
    return this.withHeader(headerName, key);
  }

  /**
   * Configure rate limiting
   */
  withRateLimit(maxRequests: number, perMilliseconds = 60000): this {
    this.config.rateLimit = { maxRequests, perMilliseconds };
    return this;
  }

  /**
   * Enable response caching
   */
  withCache(ttl = 300000, maxSize = 100): this {
    this.config.cache = { enabled: true, ttl, maxSize };
    return this;
  }

  /**
   * Add request interceptor
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  withRequestInterceptor(interceptor: any): this {
    if (!this.config.interceptors) {
      this.config.interceptors = { request: [], response: [], error: [] };
    }
    this.config.interceptors.request?.push(interceptor);
    return this;
  }

  /**
   * Add response interceptor
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  withResponseInterceptor(interceptor: any): this {
    if (!this.config.interceptors) {
      this.config.interceptors = { request: [], response: [], error: [] };
    }
    this.config.interceptors.response?.push(interceptor);
    return this;
  }

  /**
   * Add error interceptor
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  withErrorInterceptor(interceptor: any): this {
    if (!this.config.interceptors) {
      this.config.interceptors = { request: [], response: [], error: [] };
    }
    this.config.interceptors.error?.push(interceptor);
    return this;
  }

  /**
   * Build and validate the configuration
   */
  build(): ApiClientConfig {
    return ApiClientConfigSchema.parse(this.config);
  }

  /**
   * Create a development API client preset
   */
  static development(): ApiClientBuilder {
    return new ApiClientBuilder()
      .withBaseURL("http://localhost:3000/api")
      .withTimeout(60000)
      .withRetries(1)
      .withHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      });
  }

  /**
   * Create a production API client preset
   */
  static production(): ApiClientBuilder {
    return new ApiClientBuilder()
      .withBaseURL(
        process.env["NEXT_PUBLIC_API_URL"] || "https://api.kotadb.com",
      )
      .withTimeout(30000)
      .withRetries(3)
      .withRateLimit(100, 60000)
      .withCache(300000, 100)
      .withHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
      });
  }

  /**
   * Create a test API client preset
   */
  static test(): ApiClientBuilder {
    return new ApiClientBuilder()
      .withBaseURL("http://localhost:3001/api")
      .withTimeout(5000)
      .withRetries(0)
      .withHeaders({
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Test-Mode": "true",
      });
  }
}
