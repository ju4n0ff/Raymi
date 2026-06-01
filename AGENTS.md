# AGENTS

## Project Snapshot

- Single-package React 18 + Vite 5 app (no monorepo). No TypeScript, no test framework.
- Entrypoint: `src/main.jsx` → `src/App.jsx`. `BrowserRouter` from `react-router-dom` v7.
- `MainLayout` wraps the home route and owns shared state (`Navbar`, `Footer`, `Modal`, `WhatsAppButton`). Global `<Cursor />` sits outside `<Routes>` in `App.jsx`.
- `MainLayout` passes `{ open }` (modal trigger) via `<Outlet context={{open}}/>`; `Home` retrieves it with `useOutletContext()` and distributes as `open`/`onReserve`/`onOpen` props to children.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build (main verification step) |
| `npm run lint` | ESLint on `src/`, **zero warnings allowed** (`--max-warnings 0`) |
| `npm run format` | Prettier writes in-place to `src/` |

No test or typecheck scripts exist.

## Code Conventions

- **Prettier** (`.prettierrc`): no semicolons, single quotes, trailing commas (`es5`), printWidth 100, tabWidth 2.
- **ESLint**: `react/prop-types` off, `no-unused-vars` as `warn` with `argsIgnorePattern: "^_"`.
- **Styling**: CSS Modules per component (`*.module.css`) + global styles in `src/styles/global.css`.
- **Images**: All photos in AVIF format. Source originals go in `raw/<category>/`; run `node scripts/convertir.mjs` to convert + resize (max 1200 px, quality 80) into `public/images/<category>/`. Special files (hero, about, logo) live in `raw/` root.
- **Photo wall** (`PHOTO_WALL` in data): images from `public/images/mosaico/` loaded via Vite glob. File naming convention: `v<N>` = portrait, `h<N>` = landscape, `s<N>` = square.

## Data & Environment

- `src/data/index.js` — single source of truth for all static content: `SLIDES`, `CATS`, `SERVICES`, `PACKS`, `CONTACT_INFO`, `PHOTO_WALL`. Edit data here, never in components.
- EmailJS contact form in `src/services/contactService.js` sends to raymifotografia24@gmail.com. Requires `.env` with `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`. Template expects variables: `nombre`, `telefono`, `servicio`, `fecha`, `mensaje`.
- `.gitignore` excludes `.env`, `raw/`, `dist/`, `node_modules/`.

## Gotchas

- `src/pages/Packs.jsx` is an empty stub; the real `Packs` component lives at `src/components/Packs.jsx`.
- `README.md` mentions Supabase — this is stale, no supabase code exists in the project.
- Both `package-lock.json` and `pnpm-lock.yaml` exist; `npm install` is the verified install command.
