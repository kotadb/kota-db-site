import { z } from "zod";

interface RequestConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: unknown;
  timeout?: number;
  retries?: number;
  cache?: RequestCache;
}

interface ApiClientConfig {
  baseUrl: string;
  defaultHeaders?: Record<string, string>;
  timeout?: number;
  retries?: number;
  interceptors?: {
    request?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
    response?: <T>(response: T) => T | Promise<T>;
    error?: (error: Error) => Error | Promise<Error>;
  };
}

class ApiClient {
  constructor(private config: ApiClientConfig) {}

  private async executeRequest<T>(
    endpoint: string,
    config: RequestConfig = {},
  ): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    const finalConfig: RequestConfig = {
      ...config,
      headers: {
        ...this.config.defaultHeaders,
        ...config.headers,
      },
      timeout: config.timeout ?? this.config.timeout ?? 30000,
      retries: config.retries ?? this.config.retries ?? 3,
    };

    if (this.config.interceptors?.request) {
      const interceptedConfig =
        await this.config.interceptors.request(finalConfig);
      Object.assign(finalConfig, interceptedConfig);
    }

    let lastError: Error | undefined;
    const maxRetries = finalConfig.retries ?? 0;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(
          () => controller.abort(),
          finalConfig.timeout ?? 30000,
        );

        const fetchOptions: RequestInit = {
          method: finalConfig.method ?? "GET",
          headers: finalConfig.headers as HeadersInit,
          body: finalConfig.body ? JSON.stringify(finalConfig.body) : null,
          signal: controller.signal,
        };

        if (finalConfig.cache) {
          fetchOptions.cache = finalConfig.cache;
        }

        const response = await fetch(url, fetchOptions);

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();

        if (this.config.interceptors?.response) {
          data = await this.config.interceptors.response(data);
        }

        return data as T;
      } catch (error) {
        lastError = error as Error;
        if (this.config.interceptors?.error) {
          lastError = await this.config.interceptors.error(lastError);
        }
        if (attempt === maxRetries) {
          throw lastError;
        }
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * (attempt + 1)),
        );
      }
    }

    throw lastError;
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.executeRequest<T>(endpoint, { ...config, method: "GET" });
  }

  async post<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<T> {
    return this.executeRequest<T>(endpoint, {
      ...config,
      method: "POST",
      body,
    });
  }

  async put<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<T> {
    return this.executeRequest<T>(endpoint, { ...config, method: "PUT", body });
  }

  async patch<T>(
    endpoint: string,
    body?: unknown,
    config?: RequestConfig,
  ): Promise<T> {
    return this.executeRequest<T>(endpoint, {
      ...config,
      method: "PATCH",
      body,
    });
  }

  async delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    return this.executeRequest<T>(endpoint, { ...config, method: "DELETE" });
  }
}

export class ApiClientFactory {
  static createProduction(baseUrl: string): ApiClient {
    return new ApiClient({
      baseUrl,
      defaultHeaders: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 30000,
      retries: 3,
      interceptors: {
        request: (config) => {
          return config;
        },
        response: (response) => {
          return response;
        },
        error: (error) => {
          console.error("API Error:", error.message);
          return error;
        },
      },
    });
  }

  static createDevelopment(baseUrl: string): ApiClient {
    return new ApiClient({
      baseUrl,
      defaultHeaders: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 60000,
      retries: 1,
      interceptors: {
        request: (config) => {
          console.error("API Request:", config);
          return config;
        },
        response: (response) => {
          console.error("API Response:", response);
          return response;
        },
        error: (error) => {
          console.error("API Error:", error);
          return error;
        },
      },
    });
  }

  static createWithAuth(baseUrl: string, token: string): ApiClient {
    return new ApiClient({
      baseUrl,
      defaultHeaders: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      timeout: 30000,
      retries: 3,
    });
  }

  static createWithValidation<T extends z.ZodType>(
    baseUrl: string,
    responseSchema: T,
  ): ApiClient {
    return new ApiClient({
      baseUrl,
      defaultHeaders: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 30000,
      retries: 3,
      interceptors: {
        response: <T>(response: T) => {
          return responseSchema.parse(response) as T;
        },
      },
    });
  }

  static createWithFailureInjection(
    baseUrl: string,
    failureRate = 0.1,
  ): ApiClient {
    return new ApiClient({
      baseUrl,
      defaultHeaders: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 30000,
      retries: 0,
      interceptors: {
        request: (config) => {
          if (Math.random() < failureRate) {
            throw new Error("Injected network failure for testing");
          }
          return config;
        },
      },
    });
  }
}
