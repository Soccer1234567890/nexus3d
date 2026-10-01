# ORBIT — Milestone 0: Brainstorm & Plan

_Status: Milestone 1 (foundation realignment) complete. Next: Milestone 2, domain and storage._

## 1. Where the repository stands (verified 2026-10-01)

The repo was scaffolded in an earlier session as **NEXUS**, "a living, cinematic 3D
city generated from your GitHub repositories". That direction conflicts with ORBIT's
brief (premium, lightweight, no GPU-heavy 3D).

| Check                  | Result | Notes                                                           |
| ---------------------- | ------ | --------------------------------------------------------------- |
| `npm ci`               | pass   | 527 packages, Node 22.22                                        |
| `npm run typecheck`    | pass   | strict TS, `noUncheckedIndexedAccess`                           |
| `npm run lint`         | pass   | eslint-config-next 16                                           |
| `npm run format:check` | pass   | Prettier 3                                                      |
| `npm run test`         | FAIL   | Vitest exits 1: no test files exist yet. CI `Test` step is red. |
| `npm run build`        | pass   | Next 16.3.8, Turbopack, 2 static routes                         |

Foundation issues to resolve in Milestone 1:

- `package.json` name/description still say NEXUS.
- Heavy 3D dependencies are pinned but unused: `three`, `@react-three/fiber`,
  `@react-three/drei`, `@react-three/postprocessing`, `postprocessing`. They
  contradict the ORBIT constraints and should be removed.
- Keep: `motion` (Framer Motion), `gsap` (occasional), `zustand` (state), Tailwind 4.
- `vitest run` fails with zero tests; the first real test fixes this.
- `src/app/layout.tsx` metadata and `page.tsx` are create-next-app placeholders.

## 2. What ORBIT is (proposed interpretation — needs confirmation)

The brief gives three hard facts: ORBIT has an **internal calendar**, it should feel
**premium and Apple-like**, and it must stay **lightweight**. Everything else below is
a proposal to confirm or correct.

**Proposed one-liner:** ORBIT is a personal command center. The things in your life
orbit around today: events, tasks, and notes arranged by time distance from _now_.

**Core objects (v1):**

- Event: title, start, end or all-day, optional location, optional colour tag.
- Task: title, due date (optional), done state.
- Note: short free text attached to a day.

**Core views (v1):**

- Today ("centre of orbit"): what is happening now and next, with tasks due.
- Week: seven columns, lightweight, keyboard navigable.
- Month: compact grid for orientation, click to drill into a day.

**Persistence (v1):** local first. Data stored in the browser (IndexedDB via a thin
repository layer) so the app is useful with no backend and no accounts. The
repository interface is designed so a server or Google Calendar sync can be added
later without touching UI code.

**Explicitly not in v1:** accounts, server sync, Google Calendar, voice, 3D.

## 3. Visual direction (summary, full pass in Milestone 2)

- Light and dark themes from the start; neutral warm greys, one accent.
- System font stack with optical sizing (`-apple-system`, `Inter` fallback), tight
  tracking on display sizes, generous leading on body.
- Depth through 1 px hairlines and soft, short shadows, not heavy blur.
- Translucent surfaces only on floating layers (popovers, sheets), capped at one
  `backdrop-filter` layer on screen at a time.
- Motion: CSS transforms and opacity via Framer Motion springs; interruptible;
  honours `prefers-reduced-motion`. No continuous loops.

## 4. Milestones

Each milestone ends with tests, lint, typecheck, production build, a commit, and a
stop-and-report. One milestone per run.

1. **Foundation realignment.** Rename to ORBIT, remove 3D deps, set metadata, add
   design tokens in `globals.css`, root layout with theme support, app shell with
   navigation placeholder, first unit test so CI goes green.
2. **Domain and storage.** Typed models for Event/Task/Note, date utilities, a
   repository interface with an in-memory implementation (TDD), then IndexedDB
   implementation. Zustand store wired to the repository.
3. **Today view.** The centre screen: now/next timeline, due tasks, quick add.
4. **Week view.** Columns, event blocks, keyboard navigation, create by click.
5. **Month view and day drill-in.**
6. **Polish pass.** Micro-interactions, empty states, accessibility audit,
   responsive check on phone widths, performance check (no long tasks, no
   constant repaints).

## 5. Open questions for you

1. Is the one-liner in section 2 right? If ORBIT is something else (a team tool, a
   habit tracker, a planner for a specific domain), say so in a sentence.
2. Confirm removal of the Three.js / React Three Fiber dependencies.
3. Local-only storage for v1, or do you already have a backend/auth preference?
4. Should the package and repo naming move from `nexus` to `orbit` now?
