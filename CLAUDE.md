# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site (rushh.dev) — single-page React 19 + TypeScript + Vite app, styled with Tailwind CSS 3 + daisyUI, animated with framer-motion. Deployed to Vercel via GitHub Actions.

## Commands

```bash
npm run dev              # Start Vite dev server
npm run build            # tsc -b && vite build
npm run lint             # ESLint check (lint:fix to auto-fix)
npm run format:check     # Prettier check (format to write)
npm test                 # Run all tests once (vitest run)
npx vitest run src/components/Header.test.tsx   # Run a single test file
npm run test:coverage    # Tests with coverage (80% threshold on lines/functions/branches/statements)
npm run quality          # Full local quality check (scripts/quality-check.js)
```

## Pre-commit hook (husky)

Every commit runs: `tsc --noEmit`, lint-staged (prettier + eslint --fix + `vitest related` on staged `*.ts/tsx`), then the full `test:coverage` suite. Commits fail if coverage drops below the 80% thresholds in `vite.config.ts`. New components generally need co-located `*.test.tsx` files to keep coverage passing (some files are excluded from coverage — see `coverage.exclude` in `vite.config.ts`).

## Architecture

Single-page app; no router. `App.tsx` composes lazy-loaded section components from `src/sections/` (Hero, About, Projects, Experience, TechnicalStack, Education, Contact) in a fixed order with dividers between them.

- **`src/data/`** — all portfolio content (projects, experience, education, skills) lives here as typed constants, re-exported through `src/data/index.ts`. Content edits happen here, not in components. Types in `src/data/types.ts`.
- **`src/sections/`** — page sections rendering that data.
- **`src/components/`** — shared chrome (Header, Footer, ResumeModal, DotMatrixDisplay) with reusable primitives in `components/ui/` (Card3D, Spotlight, TextGenerateEffect, BackgroundGrid).
- **`src/contexts/ThemeContext.tsx`** — dark/light theme via daisyUI `data-theme` attribute, persisted to localStorage (guarded for restricted environments). Context object is split into `ThemeContext.context.ts` for react-refresh compliance; consume via `src/hooks/useTheme.ts`.
- **`src/hooks/`** — `useSmoothWheelScroll` (rAF-based smooth scrolling applied in App), `useReveal` (scroll-reveal animations), `useGitHubRepos` (fetches live repo data).

Path alias: `@` → `src/` (configured in `vite.config.ts` and `tsconfig.app.json`).

Tests use Vitest + React Testing Library with `happy-dom`; setup in `src/test/setup.ts`.

Manual chunk splitting in `vite.config.ts` separates react, framer-motion, and pdf vendors — heavy new dependencies should get their own chunk there.

## CI/CD

`.github/workflows/ci-cd.yml`: every push runs tsc, ESLint, Prettier check, build, and coverage tests. Non-main branches deploy a Vercel preview (URL commented on the PR); pushes to `main` deploy production at rushh.dev.
