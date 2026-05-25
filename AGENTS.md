# AGENTS

## Project Snapshot
- Single-package React + Vite app (no monorepo).
- App entrypoint is `src/main.jsx`, which renders `src/App.jsx`.
- Routing uses `react-router-dom` with `BrowserRouter`; `MainLayout` wraps the home route and owns shared `Navbar`, `Footer`, and `Modal` state.

## Verified Commands
- Install deps: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Preview built app: `npm run preview`
- Lint: `npm run lint` (ESLint, 0 warnings allowed)
- Format: `npm run format` (Prettier, writes in-place)

## Validation Reality
- There are no repo scripts for lint, tests, or typecheck in `package.json`; do not claim those checks were run.
- Use `npm run build` as the main non-interactive verification step after code changes.

## Environment + Data Flow
- Contact form uses `@emailjs/browser` to send messages to raymifotografia24@gmail.com.
- Configure EmailJS service/template IDs in `.env` before the form will work.
- `src/data/index.js` is the single source of truth for all static content: `SLIDES`, `CATS`, `SERVICES`, `PACKS`, `CONTACT_INFO`. Edit data here, not in components.

## Component Wiring
- `MainLayout` provides `{ open }` via `<Outlet context={{open}}/>`; `Home` retrieves it with `useOutletContext()`. Child components receive `open` or `onReserve` as props from `Home`.
- `src/pages/Packs.jsx` exists but is an empty stub; the active `Packs` component lives in `src/components/Packs.jsx`.

## Repo-Specific Gotchas
- `README.md` tree is outdated; actual structure is `src/pages/`, `src/components/`, `src/hooks/`, `src/services/`, `src/data/`, `src/supabase/`, `src/styles/`.
- Styling uses CSS Modules per component + global styles in `src/styles/global.css`; maintain this pattern.
