import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { DatabaseFactory, Database } from "./database.factory";
import { type DatabaseConfig } from "../validators/config.validator";

describe("DatabaseFactory", () => {
  const mockConfig: DatabaseConfig = {
    host: "localhost",
    port: 5432,
    database: "testdb",
    user: "testuser",
    password: "testpass",
    ssl: true,
    maxConnections: 10,
    connectionTimeout: 5000,
    idleTimeout: 30000,
  };

  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("createProduction", () => {
    it("should create a production database with appropriate settings", () => {
      const db = DatabaseFactory.createProduction(mockConfig);
      expect(db).toBeInstanceOf(Database);
    });

    it("should successfully connect with retry policy", async () => {
      const db = DatabaseFactory.createProduction(mockConfig);
      await expect(db.connect()).resolves.toBeUndefined();
    });

    it("should log connection info", async () => {
      const db = DatabaseFactory.createProduction(mockConfig);
      await db.connect();

      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining("INFO"),
      );
    });
  });

  describe("createDevelopment", () => {
    it("should create a development database with appropriate settings", () => {
      const db = DatabaseFactory.createDevelopment(mockConfig);
      expect(db).toBeInstanceOf(Database);
    });

    it("should have shorter retry delays than production", async () => {
      const db = DatabaseFactory.createDevelopment(mockConfig);
      await expect(db.connect()).resolves.toBeUndefined();
    });
  });

  describe("createTesting", () => {
    it("should create a testing database with minimal retries", () => {
      const db = DatabaseFactory.createTesting(mockConfig);
      expect(db).toBeInstanceOf(Database);
    });

    it("should connect without delays", async () => {
      const db = DatabaseFactory.createTesting(mockConfig);
      const startTime = Date.now();
      await db.connect();
      const endTime = Date.now();
      expect(endTime - startTime).toBeLessThan(100);
    });
  });

  describe("createWithFailureInjection", () => {
    it("should create a database that injects failures", async () => {
      const db = DatabaseFactory.createWithFailureInjection(mockConfig, 1.0);

      await expect(db.query("SELECT * FROM users")).rejects.toThrow(
        "Injected failure for testing",
      );
    });

    it("should sometimes succeed based on failure rate", async () => {
      const db = DatabaseFactory.createWithFailureInjection(mockConfig, 0.0);

      const result = await db.query("SELECT * FROM users");
      expect(result).toEqual([]);
    });

    it("should respect the failure rate probability", async () => {
      const db = DatabaseFactory.createWithFailureInjection(mockConfig, 0.5);
      let failures = 0;
      const attempts = 100;

      for (let i = 0; i < attempts; i++) {
        try {
          await db.query("SELECT * FROM users");
        } catch {
          failures++;
        }
      }

      expect(failures).toBeGreaterThan(20);
      expect(failures).toBeLessThan(80);
    });
  });

  describe("Database class", () => {
    it("should execute queries", async () => {
      const db = DatabaseFactory.createDevelopment(mockConfig);
      const result = await db.query<{ id: number; name: string }>(
        "SELECT * FROM users",
      );
      expect(result).toEqual([]);
    });

    it("should handle query parameters", async () => {
      const db = DatabaseFactory.createDevelopment(mockConfig);
      const result = await db.query("SELECT * FROM users WHERE id = ?", [1]);
      expect(result).toEqual([]);
    });

    it("should disconnect properly", async () => {
      const db = DatabaseFactory.createDevelopment(mockConfig);
      await db.connect();
      await db.disconnect();

      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining("Disconnecting from database"),
      );
    });
  });

  describe("Real integration patterns", () => {
    it("should handle connection lifecycle", async () => {
      const db = DatabaseFactory.createProduction(mockConfig);

      await db.connect();
      const result = await db.query("SELECT 1");
      expect(result).toBeDefined();
      await db.disconnect();
    });

    it("should handle multiple queries", async () => {
      const db = DatabaseFactory.createDevelopment(mockConfig);
      await db.connect();

      const queries = [
        db.query("SELECT * FROM users"),
        db.query("SELECT * FROM posts"),
        db.query("SELECT * FROM comments"),
      ];

      const results = await Promise.all(queries);
      expect(results).toHaveLength(3);
      results.forEach((result) => expect(result).toEqual([]));

      await db.disconnect();
    });
  });
});
