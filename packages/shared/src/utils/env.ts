const TRAILING_SLASH_REGEX = /\/+$/;

const DEFAULT_APP_URL = "http://localhost:3000";
const DEFAULT_DASHBOARD_URL = "http://localhost:3001";

function readEnv(key: string): string | undefined {
  if (typeof process === "undefined" || typeof process.env === "undefined") {
    return undefined;
  }

  const rawValue = process.env[key];
  if (typeof rawValue !== "string") {
    return undefined;
  }

  const trimmedValue = rawValue.trim();
  return trimmedValue === "" ? undefined : trimmedValue;
}

function stripTrailingSlashes(url: string): string {
  return url.replace(TRAILING_SLASH_REGEX, "");
}

function ensureUrl(value: string | undefined, fallback: string): string {
  const finalValue = stripTrailingSlashes(value ?? fallback);

  try {
    // Validate that we have a well-formed absolute URL
    void new URL(finalValue);
  } catch {
    throw new Error(`Invalid URL for environment-driven helper: ${finalValue}`);
  }

  return finalValue;
}

export function getAppUrl(): string {
  return ensureUrl(readEnv("NEXT_PUBLIC_APP_URL"), DEFAULT_APP_URL);
}

export function getDashboardUrl(): string {
  return ensureUrl(readEnv("NEXT_PUBLIC_DASHBOARD_URL"), DEFAULT_DASHBOARD_URL);
}

export function getRequiredEnv(key: string): string {
  const value = readEnv(key);
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}
