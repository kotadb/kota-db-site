import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email().toLowerCase(),
  name: z.string().min(1).max(100).trim(),
  age: z.number().int().positive().max(150).optional(),
  role: z.enum(["admin", "user", "moderator"]).default("user"),
  isActive: z.boolean().default(true),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type User = z.infer<typeof UserSchema>;

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).partial();

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;

export function validateUser(input: unknown): User {
  return UserSchema.parse(input);
}

export function validateCreateUser(input: unknown): CreateUserInput {
  return CreateUserSchema.parse(input);
}

export function validateUpdateUser(input: unknown): UpdateUserInput {
  return UpdateUserSchema.parse(input);
}

export function safeValidateUser(input: unknown): {
  success: boolean;
  data?: User;
  error?: z.ZodError;
} {
  const result = UserSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, error: result.error };
}
