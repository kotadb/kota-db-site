import { describe, it, expect } from "vitest";
import {
  UserSchema,
  CreateUserSchema,
  UpdateUserSchema,
  validateUser,
  validateCreateUser,
  validateUpdateUser,
  safeValidateUser,
} from "./user.validator";

describe("UserSchema", () => {
  it("should validate a complete user object", () => {
    const validUser = {
      id: "550e8400-e29b-41d4-a716-446655440000",
      email: "test@example.com",
      name: "John Doe",
      age: 30,
      role: "user",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = UserSchema.parse(validUser);
    expect(result).toEqual(validUser);
  });

  it("should transform email to lowercase", () => {
    const user = {
      id: "550e8400-e29b-41d4-a716-446655440000",
      email: "TEST@EXAMPLE.COM",
      name: "John Doe",
    };

    const result = UserSchema.parse(user);
    expect(result.email).toBe("test@example.com");
  });

  it("should trim name", () => {
    const user = {
      id: "550e8400-e29b-41d4-a716-446655440000",
      email: "test@example.com",
      name: "  John Doe  ",
    };

    const result = UserSchema.parse(user);
    expect(result.name).toBe("John Doe");
  });

  it("should set default values", () => {
    const user = {
      id: "550e8400-e29b-41d4-a716-446655440000",
      email: "test@example.com",
      name: "John Doe",
    };

    const result = UserSchema.parse(user);
    expect(result.role).toBe("user");
    expect(result.isActive).toBe(true);
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.updatedAt).toBeInstanceOf(Date);
  });

  it("should reject invalid email", () => {
    const user = {
      id: "550e8400-e29b-41d4-a716-446655440000",
      email: "not-an-email",
      name: "John Doe",
    };

    expect(() => UserSchema.parse(user)).toThrow();
  });

  it("should reject invalid UUID", () => {
    const user = {
      id: "not-a-uuid",
      email: "test@example.com",
      name: "John Doe",
    };

    expect(() => UserSchema.parse(user)).toThrow();
  });

  it("should reject invalid age", () => {
    const user = {
      id: "550e8400-e29b-41d4-a716-446655440000",
      email: "test@example.com",
      name: "John Doe",
      age: -5,
    };

    expect(() => UserSchema.parse(user)).toThrow();
  });

  it("should reject invalid role", () => {
    const user = {
      id: "550e8400-e29b-41d4-a716-446655440000",
      email: "test@example.com",
      name: "John Doe",
      role: "invalid-role",
    };

    expect(() => UserSchema.parse(user)).toThrow();
  });
});

describe("CreateUserSchema", () => {
  it("should validate user creation input", () => {
    const input = {
      email: "test@example.com",
      name: "John Doe",
      age: 30,
      role: "admin",
      isActive: false,
    };

    const result = CreateUserSchema.parse(input);
    expect(result).toEqual({
      ...input,
      email: input.email.toLowerCase(),
      name: input.name.trim(),
    });
  });

  it("should work with minimal input", () => {
    const input = {
      email: "test@example.com",
      name: "John Doe",
    };

    const result = CreateUserSchema.parse(input);
    expect(result.email).toBe("test@example.com");
    expect(result.name).toBe("John Doe");
    expect(result.role).toBe("user");
    expect(result.isActive).toBe(true);
  });
});

describe("UpdateUserSchema", () => {
  it("should accept partial updates", () => {
    const input = {
      name: "Jane Doe",
    };

    const result = UpdateUserSchema.parse(input);
    expect(result.name).toBe("Jane Doe");
    // Other fields may have defaults from schema
  });

  it("should accept empty object", () => {
    const input = {};
    const result = UpdateUserSchema.parse(input);
    // Empty input may still have default values from schema
    expect(result).toBeDefined();
  });

  it("should validate fields that are provided", () => {
    const input = {
      email: "not-an-email",
    };

    expect(() => UpdateUserSchema.parse(input)).toThrow();
  });
});

describe("Validation functions", () => {
  describe("validateUser", () => {
    it("should validate and return user", () => {
      const input = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        email: "test@example.com",
        name: "John Doe",
      };

      const result = validateUser(input);
      expect(result.email).toBe("test@example.com");
    });

    it("should throw on invalid input", () => {
      const input = {
        id: "invalid",
        email: "test@example.com",
        name: "John Doe",
      };

      expect(() => validateUser(input)).toThrow();
    });
  });

  describe("validateCreateUser", () => {
    it("should validate and return create user input", () => {
      const input = {
        email: "test@example.com",
        name: "John Doe",
      };

      const result = validateCreateUser(input);
      expect(result.email).toBe("test@example.com");
    });
  });

  describe("validateUpdateUser", () => {
    it("should validate and return update user input", () => {
      const input = {
        name: "Jane Doe",
      };

      const result = validateUpdateUser(input);
      expect(result.name).toBe("Jane Doe");
    });
  });

  describe("safeValidateUser", () => {
    it("should return success with valid data", () => {
      const input = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        email: "test@example.com",
        name: "John Doe",
      };

      const result = safeValidateUser(input);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.error).toBeUndefined();
    });

    it("should return error with invalid data", () => {
      const input = {
        id: "invalid",
        email: "test@example.com",
        name: "John Doe",
      };

      const result = safeValidateUser(input);
      expect(result.success).toBe(false);
      expect(result.data).toBeUndefined();
      expect(result.error).toBeDefined();
    });
  });
});
