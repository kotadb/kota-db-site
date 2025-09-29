import * as crypto from "crypto";

export function generateApiKey(): {
  key: string;
  hash: string;
  prefix: string;
} {
  // Generate a secure random API key
  const key = `kota_${crypto.randomBytes(32).toString("hex")}`;

  // Hash the key for storage
  const hash = crypto.createHash("sha256").update(key).digest("hex");

  // Store first 8 chars as prefix for identification
  const prefix = key.substring(0, 12);

  return { key, hash, prefix };
}

export function hashApiKey(key: string): string {
  return crypto.createHash("sha256").update(key).digest("hex");
}

export function validateGitHubUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname === "github.com" &&
      parsed.pathname.split("/").filter(Boolean).length >= 2
    );
  } catch {
    return false;
  }
}

export function extractRepoName(githubUrl: string): string {
  try {
    const parsed = new URL(githubUrl);
    const parts = parsed.pathname.split("/").filter(Boolean);
    return parts.slice(0, 2).join("/");
  } catch {
    return "";
  }
}
