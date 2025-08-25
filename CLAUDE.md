# KotaDB Site - AI Agent Instructions

## Project Overview

KotaDB documentation and landing page built with Next.js 15, following LLM-Assisted Development Success Patterns.

## Essential Commands

```bash
# Development
pnpm dev              # Start development server with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server

# Quality Assurance (MUST RUN BEFORE COMMITS)
pnpm typecheck        # TypeScript type checking
pnpm lint             # ESLint with strict rules
pnpm format           # Format with Prettier
pnpm format:check     # Check formatting
pnpm quality          # Run all quality checks

# Testing (when implemented)
pnpm test             # Run all tests
pnpm test:watch       # Run tests in watch mode
pnpm test:coverage    # Generate coverage report
```

## Architecture Decisions

### Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strictest settings
- **Styling**: Tailwind CSS v4
- **Documentation**: Astro (in docs-site/)
- **Package Manager**: pnpm
- **Quality Tools**: ESLint, Prettier, Husky, lint-staged

### Zero-Tolerance Quality Standards

1. **No TypeScript errors** - All strict flags enabled
2. **No ESLint warnings** - Errors only, no warnings allowed
3. **No console.log statements** - Use proper logging
4. **No formatting issues** - Prettier enforced
5. **No unhandled promises** - All async operations handled
6. **No unused variables/imports** - Keep code clean
7. **Conventional commits required** - feat/fix/docs/etc.

### File Structure Patterns

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable React components
│   ├── ui/             # Basic UI components
│   └── features/       # Feature-specific components
├── lib/                # Core business logic
│   ├── validators/     # Input validation with Zod
│   ├── factories/      # Factory functions
│   └── utils/          # Utility functions
├── hooks/              # Custom React hooks
└── types/              # TypeScript type definitions
```

## Development Workflow

### Branch Strategy

- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - New features
- `fix/*` - Bug fixes
- `docs/*` - Documentation updates

### Commit Message Format

```
<type>(<scope>): <subject>

Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
Example: feat(auth): add login functionality
```

### Issue-Driven Development

Every change should map to a GitHub issue with labels:

- **Component**: [backend, frontend, database, api]
- **Priority**: [critical, high, medium, low]
- **Effort**: [small <1d, medium 1-3d, large >3d]
- **Status**: [needs-investigation, blocked, in-progress, ready-review]

## Code Patterns

### Factory Pattern Example

```typescript
// lib/factories/database.factory.ts
export class DatabaseFactory {
  static createProduction(config: DatabaseConfig): Database {
    return new Database({
      ...config,
      retryPolicy: new ExponentialBackoffRetry(),
      validator: new StrictValidator(),
      logger: new StructuredLogger(),
      cache: new RedisCache(),
    });
  }
}
```

### Validated Types Pattern

```typescript
// lib/validators/user.validator.ts
import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().int().positive().max(150),
});

export type User = z.infer<typeof UserSchema>;

export function createUser(input: unknown): User {
  return UserSchema.parse(input);
}
```

### Component Pattern

```typescript
// components/ui/Button.tsx
import { type ButtonHTMLAttributes, type FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  // Implementation
  return <button {...props}>{children}</button>;
};
```

## Testing Philosophy

### Anti-Mock Approach

- Use real implementations with failure injection
- Test actual I/O operations, not simulated ones
- Implement chaos testing with real failure scenarios

### Test Categories

1. **Unit Tests**: Pure functions, validators, utilities
2. **Integration Tests**: API endpoints, database operations
3. **E2E Tests**: User workflows, critical paths
4. **Chaos Tests**: Failure injection, recovery scenarios

## Communication Protocol

### GitHub-First

- Progress updates in issue/PR comments
- Architectural decisions in ADRs (docs/adr/)
- Knowledge accumulation through PR descriptions

### Handoff Protocol

When switching agent sessions:

1. Update relevant GitHub issues with progress
2. Commit all changes with descriptive messages
3. Leave clear TODO comments for next steps
4. Update this file if new patterns emerge

## Quality Gates

### Core Gates (Pre-commit)

- Formatting (Prettier)
- Linting (ESLint)
- Type checking (TypeScript)
- No console.log statements
- Conventional commit format

### CI/CD Gates (GitHub Actions)

- All core gates
- Unit tests pass
- Integration tests pass
- Build succeeds
- No security vulnerabilities
- Performance benchmarks met

## Performance Standards

- Lighthouse score > 95
- Bundle size < 200KB (initial)
- Time to Interactive < 3s
- No memory leaks
- No performance regressions

## Security Requirements

- No secrets in code
- All inputs validated
- XSS protection enabled
- CSRF tokens implemented
- Dependencies regularly updated
- Security headers configured

## Common Issues & Solutions

### TypeScript Strict Mode Issues

If you encounter strict mode errors:

1. Fix the actual issue, don't bypass with `any` or `!`
2. Use proper type guards and narrowing
3. Leverage discriminated unions for complex types

### Import Resolution

- Use `@/` alias for src/ imports
- Keep imports organized (builtin > external > internal)
- No circular dependencies

### State Management

- Use React's built-in state for component state
- Use Context API for cross-component state
- Consider Zustand for complex global state

## DO NOT

- Create files without clear purpose
- Add unnecessary documentation files
- Mock dependencies in tests
- Use `any` type or non-null assertions
- Ignore linting/formatting errors
- Commit without running quality checks
- Add console.log statements
- Create complex abstractions prematurely

## ALWAYS

- Run `pnpm quality` before committing
- Follow existing patterns in codebase
- Write self-documenting code
- Use TypeScript strict mode
- Handle errors explicitly
- Test with real implementations
- Update GitHub issues with progress
- Keep commits atomic and focused

---

_This document is the single source of truth for AI agents. Update it when patterns evolve._
