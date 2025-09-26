#!/usr/bin/env node
import { readdir, readFile, stat } from "node:fs/promises";
import { extname, join, relative } from "node:path";

const projectRoot = process.cwd();
const appsDir = join(projectRoot, "apps");
const allowedExtensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
]);
const forbiddenPatterns = [
  /https:\/\/kotadb\.io/i,
  /https:\/\/app\.kotadb\.io/i,
];
const ignoredDirectories = new Set([
  "node_modules",
  ".next",
  ".vercel",
  "dist",
  "build",
  "out",
]);

async function walk(directory, matches) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (ignoredDirectories.has(entry.name)) {
        continue;
      }

      await walk(join(directory, entry.name), matches);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const filePath = join(directory, entry.name);
    const extension = extname(filePath);

    if (!allowedExtensions.has(extension)) {
      continue;
    }

    const content = await readFile(filePath, "utf8");
    const lines = content.split(/\r?\n/);

    lines.forEach((line, index) => {
      if (forbiddenPatterns.some((pattern) => pattern.test(line))) {
        matches.push({
          file: relative(projectRoot, filePath),
          line: index + 1,
          text: line.trim(),
        });
      }
    });
  }
}

async function main() {
  try {
    const stats = await stat(appsDir);
    if (!stats.isDirectory()) {
      console.error("apps directory not found");
      process.exit(1);
    }
  } catch (error) {
    console.error("Failed to access apps directory", error);
    process.exit(1);
  }

  const matches = [];
  await walk(appsDir, matches);

  if (matches.length > 0) {
    console.error("Hardcoded KotaDB domains detected under apps/**/src:\n");
    for (const match of matches) {
      console.error(`${match.file}:${match.line} -> ${match.text}`);
    }
    console.error(
      "\nReplace these instances with helpers from packages/shared/src/utils/env.ts",
    );
    process.exit(1);
  }
}

main();
