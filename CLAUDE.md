# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

KotaDB is a documentation and landing page built with Next.js 15 (App Router), TypeScript with strict settings, and Tailwind CSS v4. The project follows **LLM-Assisted Development Success Patterns** with zero-tolerance quality standards, creating a "pit of success" architecture where the easiest path for agents is also the correct one.

## Essential Commands

```bash
# Development
pnpm dev              # Start dev server with Turbopack on localhost:3000
pnpm build            # Build for production
pnpm start            # Start production server

# Quality Assurance (MUST RUN BEFORE COMMITS)
pnpm quality          # Run all checks (typecheck + lint + format:check)
pnpm typecheck        # TypeScript type checking (strict mode)
pnpm lint             # ESLint with strict rules (no warnings allowed)
pnpm format           # Format code with Prettier
pnpm format:check     # Check formatting without modifying

# Testing
pnpm test             # Run Vitest tests
pnpm test:watch       # Watch mode for tests
pnpm test:coverage    # Generate coverage report (threshold: 80%)
pnpm test:ui          # Vitest UI

# Single test execution
pnpm test path/to/file.test.ts
```

## High-Level Architecture

### Project Structure

- **Main site** (`/src`): Next.js 15 landing page with marketing content
- **Documentation** (`/docs-site`): Separate Astro-based documentation site
- **Testing**: Vitest with Happy DOM, anti-mock philosophy (use real implementations with failure injection)
- **Quality Gates**: Three-tier CI/CD pipeline (Core → Quality → Production gates)
- **Observability**: Structured logging, distributed tracing, metrics collection

### Key Architectural Patterns (LLM-Optimized)

1. **Validated Types Pattern**: Prevent invalid construction at runtime
   - Location: `src/lib/validators/`
   - Base validator: `src/lib/validators/base.validator.ts`
   - Pattern: Schema → Type inference → Parse function → Factory creation

2. **Builder Pattern**: Fluent APIs that guide correct usage
   - Location: `src/lib/builders/`
   - Examples: `DatabaseBuilder`, `ApiClientBuilder`
   - Provides preset configurations: `.development()`, `.production()`, `.test()`

3. **Factory Pattern**: One-line access to production-ready components
   - Location: `src/lib/factories/`
   - Example: `DatabaseFactory.createProduction()` assembles all safety features

4. **Anti-Mock Testing**: Real implementations with failure injection
   - Location: `src/lib/testing/`
   - Failure injection: `failure-injection.ts`
   - Real implementations: `real-implementations.ts`
   - Chaos testing orchestration supported

5. **Comprehensive Observability**:
   - Structured logging: `src/lib/observability/logger.ts`
   - Distributed tracing: `src/lib/observability/tracer.ts`
   - Metrics collection: `src/lib/observability/metrics.ts`
   - Decorators: `@Trace`, `@Metric` for automatic instrumentation

6. **Component Library**: Composable, reusable UI components
   - Location: `src/components/ui/`
   - Central exports: `src/components/ui/index.ts`
   - Pattern: Variant-based styling with CVA (class-variance-authority)

7. **Import Strategy**:
   - Use `@/` alias for src imports
   - Never use absolute paths starting with `/`
   - Order: builtin → external → internal

## Critical Quality Standards

### TypeScript Configuration

- **ALL strict flags enabled** including:
  - `noUncheckedIndexedAccess`: Array access requires null checks
  - `exactOptionalPropertyTypes`: Distinguishes `undefined` from optional
  - `verbatimModuleSyntax`: Explicit type imports required
  - `noPropertyAccessFromIndexSignature`: Forces bracket notation for index signatures

### Pre-commit Enforcement

The `.husky/pre-commit` hook blocks commits that violate:

- TypeScript errors (any strict mode violation)
- ESLint errors (warnings treated as errors)
- Prettier formatting
- `console.log` statements (automatic detection and rejection)
- Absolute path imports (warning only)

### Testing Philosophy

- **No mocks**: Test with real implementations + failure injection
- **Coverage thresholds**: 80% for branches, functions, lines, statements
- **Test location**: Colocated with source as `*.test.ts` or `*.spec.ts`
- **Setup**: Global test setup in `src/test/setup.ts`

## Development Workflow

### Git Flow Branching Strategy

```bash
# Main branches
main          # Production-ready code
develop       # Integration branch

# Feature branches
feature/      # New features (from develop)
bugfix/       # Bug fixes (from develop)
release/      # Release preparation (from develop)
hotfix/       # Emergency fixes (from main)

# Commit format (enforced)
<type>(<scope>): <subject>
# Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
```

### GitHub-First Communication

Every change maps to a GitHub issue with structured labels:

- **Component**: `[backend, frontend, database, api]`
- **Priority**: `[critical, high, medium, low]`
- **Effort**: `[small <1d, medium 1-3d, large >3d]`
- **Status**: `[needs-investigation, blocked, in-progress, ready-review]`
- **Type**: `[bug, feature, enhancement, documentation, test, refactor, performance, security]`

Label configuration: `.github/labels.yml`

## Common Gotchas & Solutions

### TypeScript Strictness

```typescript
// ❌ WRONG - noUncheckedIndexedAccess violation
const item = array[0];
item.property; // Error: Object is possibly 'undefined'

// ✅ CORRECT
const item = array[0];
if (item) {
  item.property;
}
```

### Import Paths

```typescript
// ❌ WRONG - Absolute path
import { Button } from "/src/components/ui/Button";

// ✅ CORRECT - Alias
import { Button } from "@/components/ui/Button";
```

### Validation Pattern

```typescript
// Always validate unknown data
import { z } from "zod";

const Schema = z.object({
  /* ... */
});
type ValidatedType = z.infer<typeof Schema>;

function processData(input: unknown): ValidatedType {
  return Schema.parse(input); // Throws if invalid
}
```

## Environment Details

- **Node**: Check `.nvmrc` for version
- **Package Manager**: pnpm (required)
- **IDE Config**: Prettier + ESLint integration recommended
- **Git Hooks**: Auto-installed via Husky on `pnpm install`

## DO NOT

- Use `any` type or `!` assertions
- Add console.log statements
- Mock dependencies in tests
- Ignore linting/formatting errors
- Commit without running `pnpm quality`
- Create files without clear purpose

## ALWAYS

- Run `pnpm quality` before commits
- Follow existing patterns in codebase
- Handle errors explicitly
- Test with real implementations (not mocks)
- Update GitHub issues with progress
- Use TypeScript strict mode features properly
- Communicate progress via GitHub issues/PRs
- Use builder/factory patterns for complex objects
- Validate all external inputs with Zod
- Include observability (logging/tracing/metrics)

## LLM-Assisted Development Principles

This project implements the following success patterns for AI collaboration:

1. **Pit of Success Architecture**: Validated types, builders, and factories make correct code easier to write than incorrect code
2. **Anti-Mock Testing**: Test with real implementations and failure injection for better agent understanding
3. **GitHub-First Communication**: All progress tracked in issues/PRs for seamless agent handoffs
4. **Systematic Risk Reduction**: Layered safety mechanisms (validation → testing → observability → quality gates)
5. **Three-Tier Quality Gates**: Core gates (format/lint/test) → Quality gates (integration/security) → Production gates (stress/compatibility)
6. **Progressive Context Building**: Knowledge accumulates through issues, PRs, and commit history

The goal is to create a virtuous feedback cycle where:

- Agents follow established patterns → Better context for future agents → Higher quality output → Reinforces good patterns
