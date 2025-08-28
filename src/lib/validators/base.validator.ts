import { z, type ZodSchema } from "zod";

/**
 * Base validator class implementing the validated types pattern
 * Ensures all inputs are validated at runtime with comprehensive error handling
 */
export abstract class BaseValidator<T> {
  protected abstract schema: ZodSchema<T>;

  /**
   * Parse and validate input, throwing on failure
   */
  parse(input: unknown): T {
    return this.schema.parse(input);
  }

  /**
   * Parse and validate input, returning a result object
   */
  safeParse(
    input: unknown,
  ): { success: true; data: T } | { success: false; error: z.ZodError } {
    return this.schema.safeParse(input);
  }

  /**
   * Validate input without throwing
   */
  isValid(input: unknown): boolean {
    return this.schema.safeParse(input).success;
  }

  /**
   * Get the inferred TypeScript type
   */
  getType(): T {
    throw new Error("This method is for type inference only");
  }
}

/**
 * Create a validator factory with default values and transformations
 */
export function createValidator<T>(
  schema: ZodSchema<T>,
  defaults?: Partial<T>,
): {
  parse: (input: unknown) => T;
  safeParse: (
    input: unknown,
  ) => { success: true; data: T } | { success: false; error: z.ZodError };
  isValid: (input: unknown) => boolean;
  schema: ZodSchema<T>;
} {
  const enhancedSchema = defaults
    ? schema.transform((val) => ({ ...defaults, ...val }))
    : schema;

  return {
    parse: (input: unknown) => enhancedSchema.parse(input),
    safeParse: (input: unknown) => enhancedSchema.safeParse(input),
    isValid: (input: unknown) => enhancedSchema.safeParse(input).success,
    schema: enhancedSchema as ZodSchema<T>,
  };
}
