# AGENTS.md - AMVerge Website

Marketing landing page + docs for AMVerge (the desktop scene-selection app by Crptk). Single-page React scroll site with a small Postgres-backed download counter API and an MDX docs section styled to match the landing.

## AI Agent Instructions

- **Update this file** when adding/removing files, changing routing, adding components, or introducing conventions.
- **Commit style:** prefix tag in parentheses: `(add)` new features, `(fix)` bug fixes, `(update)` refactors/formatting/chores. Example: `(fix) navbar: clamp active-section offset math`.
- **Commit author:** always commit under the user's account. Do NOT add a `Co-Authored-By: Claude` trailer or any self-attribution.
- **Commit per task:** separate commit after each task/logical change. Do not batch unrelated changes.
- **No em dashes:** never use `—` in any prose, docs, README, MDX, or commit messages. Use a comma, colon, parentheses, or plain hyphen `-` instead.
- **Accent color is dynamic:** all theme color comes from the CSS var `--accent`. The navbar hue slider rewrites it at runtime on `document.documentElement`. Never hardcode the accent green, use `var(--accent)`.
- **Two CSS worlds:** `index.css` is a light/dark token system that is mostly overridden. `App.css` sets the real look (black bg, `Jersey 10` pixel font on everything). Docs live in `Docs.css`. Know which file owns a rule before editing.

## Build & Run

```bash
npm install
npm run dev        # Vite dev server, http://localhost:5173
npm run build      # tsc -b + vite build -> dist/
npm run preview    # serve built dist/
npm run lint       # eslint
```

Download counter API (separate process, needs Postgres):

```bash
DATABASE_URL=postgres://... npm start   # node counter-server.cjs, port 3001
```

## Tech Stack

| Layer | Tech |
|---|---|
| Build | Vite 8 |
| UI | React 19 |
| Language | TypeScript ~6 |
| Routing | react-router-dom (landing `/`, docs `/docs`) |
| Docs | MDX via `@mdx-js/rollup` |
| Icons | react-icons (Fi, Fa sets) |
| Fonts | `Jersey 10` (Google Fonts, pixel look), system-ui fallback |
| Counter API | Express + `pg` (Postgres) + cors, `counter-server.cjs` |
| Lint | eslint 9 + typescript-eslint |

No backend in the Vite app itself. Download counts read live from the GitHub releases API client-side; `counter-server.cjs` is a standalone optional service.

## Directory Map

```
AMVerge-Website/
├── src/
│   ├── main.tsx              entry, BrowserRouter, routes (/ -> App, /docs -> DocsLayout)
│   ├── App.tsx               landing page, stacks all section components
│   ├── App.css               real site styling: black bg, Jersey 10 font, --accent
│   ├── index.css             light/dark token base (mostly overridden by App.css)
│   ├── mdx.d.ts              type decl for importing *.mdx as components
│   │
│   ├── components/
│   │   ├── Navbar.tsx        fixed nav, scroll-spy active section, hue slider -> --accent
│   │   ├── Landing.tsx       hero, download btn (GitHub latest .exe), cumulative dl count
│   │   ├── About.tsx         feature list + MiniUI mock
│   │   ├── MiniUI.tsx        fake app UI mockup, clip grid + preview pane (Frieren gifs)
│   │   ├── Explanation.tsx   "Why AMVerge" scrolling clip grid
│   │   ├── Merge.tsx         merge-feature copy block
│   │   └── CTA.tsx           closing call-to-action + download btn
│   │
│   ├── hooks/
│   │   └── useFadeIn.ts      IntersectionObserver -> adds .visible class on scroll
│   │
│   ├── docs/
│   │   ├── DocsLayout.tsx    docs shell: header, sidebar (from registry), <Outlet/>
│   │   ├── Docs.css          docs styling, matches landing (black/Jersey/--accent)
│   │   ├── registry.ts       single source of doc pages: slug, label, Component
│   │   └── pages/
│   │       ├── introduction.mdx
│   │       └── installation.mdx
│   │
│   └── assets/               hero.png, logos
│
├── public/
│   ├── clips/                Frieren preview gifs (used by MiniUI + Explanation)
│   ├── favicon.svg, icons.svg, link_embed_thumb.png
│
├── counter-server.cjs        Express + Postgres download counter (optional service)
├── convert.sh                clip conversion helper
├── index.html                Vite entry html
├── vite.config.ts            mdx (enforce: pre) + react plugins
├── package.json
└── AGENTS.md
```

## Key Architecture

### Routing

`main.tsx` mounts `BrowserRouter`. `/` renders the landing `App`, `/docs` renders `DocsLayout` with nested routes generated from `docs/registry.ts`. First registry entry is the `/docs` index route, the rest are `/docs/<slug>`.

### Adding a docs page

1. Create `src/docs/pages/<name>.mdx`.
2. Import it in `src/docs/registry.ts` and add `{ slug, label, Component }`.

Sidebar links and routes both come from that array. No other wiring needed.

### Landing scroll model

Single long page. Each section is a `<div id="...">` matching the `sections` list in `Navbar.tsx`. Navbar scroll-spy picks the closest section to viewport top and highlights it. Section reveal is `useFadeIn` (IntersectionObserver adds `.visible`).

### Accent color flow

`App.css` sets `html { --accent: lime }`. `Navbar.tsx` hue slider calls `document.documentElement.style.setProperty("--accent", hsl(...))`, so every `var(--accent)` across landing and docs updates live. Docs inherit this var, no separate accent.

### Download flow

`Landing.tsx` / `CTA.tsx` hit `api.github.com/repos/crptk/AMVerge/releases/latest`, find the first `.exe` asset (excluding `.sig`), and redirect to its `browser_download_url`. Cumulative count sums `download_count` across all releases. `counter-server.cjs` is a separate optional Postgres counter, not required for downloads to work.

## Code Conventions

- **TypeScript:** PascalCase components, camelCase vars/fns, typed props and API shapes.
- **Components:** one component per file in `components/`, default export.
- **Styling:** plain CSS, no Tailwind. Landing rules in `App.css`, docs rules in `Docs.css`. Use `var(--accent)` for theme color.
- **AMVerge wordmark:** `<span>AMV</span>erge`, the `AMV` span is colored `--accent`, `erge` stays white. Match this everywhere (landing, docs, MiniUI).
- **Assets:** runtime images served from `public/` via absolute paths (`/clips/...`). Build-time imports from `src/assets/`.

## Critical Paths

| File | Role |
|---|---|
| `vite.config.ts` | MDX plugin must stay `{ enforce: 'pre', ...mdx() }` before react, and react `include` must list `mdx`. Remove either and `.mdx` imports break. |
| `src/main.tsx` | Routes generated from `docs/registry.ts`. The first entry is the index route (`path` undefined, `index`), others use their slug. Keep this mapping if editing routes. |
| `src/components/Navbar.tsx` | `sections` array ids MUST match the `id=` on each landing section div, or scroll-spy and nav clicks break. Slider writes `--accent` globally. |
| `src/index.css` | `#root { text-align: center }` and `width: 80%`. Docs override both (`.docs-root { text-align: left }` + viewport breakout). Do not assume content is left-aligned by default. |
| `src/docs/Docs.css` | `.docs-root` breaks out of `#root`'s 80% width via `width: 100vw; margin-left: calc(-50vw + 50%)` to fill screen. Docs reuse the landing look (black bg, Jersey font, `--accent`). |
| `counter-server.cjs` | CORS `origin` list is hardcoded (localhost + a placeholder vercel domain). Update it for real deploys. Needs `DATABASE_URL`, SSL `rejectUnauthorized: false`. |
| `src/components/MiniUI.tsx` / `Explanation.tsx` | Both render a 35-cell clip grid from `/clips/Sousou no Frieren - 01_0109..0143.gif`. Those gif files must exist in `public/clips/`. |
| Prod deep links | Vite dev serves `/docs/installation` fine, but a static build needs SPA fallback to `index.html` or refreshing a subroute 404s. Not configured yet. |

## Origin

Promotes AMVerge (desktop app by Crptk, GitHub `crptk/AMVerge`). The companion CLI/library lives in `AMVerge-CLI` (see its `AGENTS.md`). Preview gifs are from Sousou no Frieren E01.
