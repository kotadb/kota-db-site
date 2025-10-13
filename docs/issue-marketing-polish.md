# Issue: Polish Marketing Surface / Shared UI

## Summary

Our marketing surface (home, pricing, future FAQ/login/etc.) needs stronger consistency and scalable patterns. This issue tracks the foundational improvements we want to ship soon so the site stays clean from day one.

## Tasks

- [ ] Centralize design tokens (colors, spacing, typography, gradients) in a shared module so marketing + app experiences stay in sync
- [ ] Promote reusable marketing components (header, footer, CTA, section shells) into a shared UI package with Storybook readiness
- [ ] Build a metadata/SEO helper with sensible defaults (title, description, OpenGraph, canonical URL helpers) and apply it to all pages
- [ ] Establish responsive typography/spacing guidelines (type scale, max-widths, section spacing) and refactor existing pages to use them
- [ ] Add baseline accessibility pass (contrast, focus states, aria landmarks) plus lint rules/checklists
- [ ] Stand up an MDX or content pipeline for long-form pages (FAQ, roadmap) to keep copy changes versioned but easy to edit
- [ ] (Later) Integrate QA automation suite (Playwright/Vitest) once pages stabilize
- [ ] (Later) Add analytics instrumentation (e.g., Microsoft Clarity) when we’re ready to track behavior
- [ ] (Later) Add performance guardrails (bundle analyzer budgets, image optimization presets) post-MVP

> Note: QA automation, analytics, and performance guardrails are intentionally listed as "later" tasks and can remain unchecked until we prioritize them.

## Acceptance criteria

- Marketing pages share consistent navigation, footer, typography, spacing, and metadata helpers
- Contributors can build new pages rapidly with shared section patterns and tokens
- Accessibility linting and manual checks are part of the development workflow
- Long-form content (FAQ, roadmap) is ready to move into MDX or a similar pipeline without custom wiring when needed
