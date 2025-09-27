import SHA256 from "crypto-js/sha256";
import Hex from "crypto-js/enc-hex";

function getRandomBytes(length: number): Uint8Array {
  if (typeof globalThis !== "undefined" && globalThis.crypto?.getRandomValues) {
    const buffer = new Uint8Array(length);
    globalThis.crypto.getRandomValues(buffer);
    return buffer;
  }

  try {
    // Lazy import to avoid bundlers pulling in Node polyfills on the client.
    const nodeCrypto = require("crypto") as typeof import("crypto");
    return nodeCrypto.randomBytes(length);
  } catch {
    throw new Error("Secure random number generation is not available in this environment.");
  }
}

function bytesToHex(bytes: Uint8Array | Buffer): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function hashSha256(value: string): string {
  return SHA256(value).toString(Hex);
}

export function generateApiKey(): {
  key: string;
  hash: string;
  prefix: string;
} {
  // Generate a secure random API key
  const key = `kota_${bytesToHex(getRandomBytes(32))}`;

  // Hash the key for storage
  const hash = hashSha256(key);

  // Store first 8 chars as prefix for identification
  const prefix = key.substring(0, 12);

  return { key, hash, prefix };
}

export function hashApiKey(key: string): string {
  return hashSha256(key);
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
