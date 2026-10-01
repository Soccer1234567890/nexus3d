# ORBIT

A lightweight personal command center. Your events, tasks and notes orbit around today.

ORBIT is built to look premium while staying light: HTML, CSS and SVG with small, purposeful
motion. No WebGL, no render loops.

## Stack

- Next.js 16 (App Router, Turbopack) with React 19 and strict TypeScript
- Tailwind CSS 4 with semantic design tokens in `src/app/globals.css`
- Motion (Framer Motion) for interruptible, reduced-motion-aware animation
- Zustand for client state
- Vitest + Testing Library for unit and component tests

## Develop

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

## Verify

```bash
npm run check   # typecheck, lint, format check, tests, production build
```

## Project layout

```
src/app/              routes: / (Today), /week, /month
src/components/shell  persistent frame: top bar, view switcher, clock, mark
src/lib/time          pure time helpers (unit tested)
docs/orbit            brainstorm, plan and milestone notes
```

## Roadmap

See `docs/orbit/00-brainstorm-and-plan.md`.
