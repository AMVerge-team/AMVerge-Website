# AGENTS.md - AMVerge Website

Marketing landing page + docs for AMVerge (the desktop scene-selection app by AMVerge-team). Single-page React scroll site with a small Postgres-backed download counter API. The docs section is rendered from Markdown fetched at runtime from the admin backend (managed in the separate `AMVerge-Website-Admin` repo / `admin.amverge.app`), styled to match the landing.

## AI Agent Instructions

- **Update this file** when adding/removing files, changing routing, adding components, or introducing conventions.
- **Commit style:** prefix tag in parentheses: `(add)` new features, `(fix)` bug fixes, `(update)` refactors/formatting/chores. Example: `(fix) navbar: clamp active-section offset math`.
- **Commit author:** always commit under the user's account. Do NOT add a `Co-Authored-By: Claude` trailer or any self-attribution.
- **Commit per task:** separate commit after each task/logical change. Do not batch unrelated changes.
- **No em dashes:** never use `—` in any prose, docs, README, MDX, or commit messages. Use a comma, colon, parentheses, or plain hyphen `-` instead.
- **Accent color is dynamic:** all theme color comes from the CSS var `--accent`. The navbar hue slider rewrites it at runtime on `document.documentElement`. Never hardcode the accent green, use `var(--accent)`.
- **Two CSS worlds:** `index.css` is a light/dark token system that is mostly overridden. `src/css/home.css` sets the real look (black bg, `Jersey 10` pixel font on everything). Docs live in `src/css/docs.css`. Know which file owns a rule before editing.

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
| Routing | react-router-dom (landing `/`, docs `/docs/:slug`) |
| Docs | Markdown fetched from the API, rendered with `react-markdown` (+ `remark-gfm`, `rehype-raw`, `rehype-slug`, `rehype-highlight`) |
| Icons | react-icons (Fi, Fa sets) |
| Fonts | `Jersey 10` (Google Fonts, pixel look), system-ui fallback |
| Counter API | Express + `pg` (Postgres) + cors, `counter-server.cjs` |
| Lint | eslint 9 + typescript-eslint |

Download counts read live from the GitHub releases API client-side; `counter-server.cjs` is a standalone optional download counter. Docs content is fetched at runtime from the admin backend via `VITE_ADMIN_API_URL` (see `.env.example`). The docs section is no longer MDX/build-time.

## Directory Map

```
AMVerge-Website/
├── src/
│   ├── main.tsx              entry, BrowserRouter, routes (/ -> App, /docs -> DocsLayout)
│   ├── App.tsx               landing page, stacks all section components
│   ├── index.css             light/dark token base (mostly overridden by home.css)
│   ├── vite-env.d.ts         import.meta.env typing (VITE_ADMIN_API_URL)
│   │
│   ├── css/
│   │   ├── home.css          real site styling: black bg, Jersey 10 font, --accent
│   │   ├── pages.css         shared styling for multi-page routes (landing look)
│   │   ├── features.css      feature section alternating layout + video placeholders
│   │   └── docs.css          docs styling, matches landing (black/Jersey/--accent)
│   │
│   ├── components/
│   │   ├── home/
│   │   │   ├── Landing.tsx       hero, download btn, cumulative dl count
│   │   │   ├── About.tsx         feature text + MiniUI mock
│   │   │   ├── Explanation.tsx   "Hours vs Minutes" split comparison + clip grid
│   │   │   ├── Merge.tsx         merge-feature copy block
│   │   │   ├── CTA.tsx           closing call-to-action + download btn
│   │   │   └── Contributors.tsx  GitHub contributors grid section
│   │   │
│   │   ├── ui/
│   │   │   ├── Navbar.tsx        brand | nav links | hue slider + Download
│   │   │   ├── Footer.tsx        shared footer (links + GitHub + contributors)
│   │   │   ├── MiniUI.tsx        fake app UI mockup (clip grid + preview pane)
│   │   │   ├── SectionDivider.tsx accent gradient separator between sections
│   │   │   └── ContributorAvatars.tsx compact overlapping avatar row
│   │   │
│   │   └── features/
│   │       ├── clipFrames.ts     shared clip frame source list
│   │       ├── DetectSection.tsx scene detection feature section
│   │       ├── BrowseSection.tsx grid browser feature section
│   │       ├── MergeFeatureSection.tsx smart merge feature section
│   │       ├── ExportSection.tsx multi-format export + NLE import section
│   │       └── FeatureCTA.tsx    bottom download CTA
│   │
│   ├── layouts/
│   │   └── SiteLayout.tsx    Navbar + <Outlet/> + Footer for the multi-page routes
│   │
│   ├── pages/
│   │   ├── Pages.css         shared styling for the routes below (landing look)
│   │   ├── Features.tsx      feature cards grid
│   │   ├── Changelog.tsx     live GitHub releases list
│   │   ├── FAQ.tsx           collapsible Q/A accordion
│   │   └── Gallery.tsx       clip showcase grid (Frieren gifs placeholder)
│   │
│   ├── hooks/
│   │   └── useFadeIn.ts      IntersectionObserver -> adds .visible class on scroll
│   │
│   ├── services/
│   │   └── github/
│   │       ├── index.ts       re-exports all public API
│   │       ├── client.ts      ghFetch wrapper, headers, base types
│   │       ├── releases.ts    fetchLatestRelease, fetchReleases, cumulativeDownloadCount
│   │       └── contributors.ts fetchContributors
│   │
│   ├── docs/                 runtime docs (content from the API, not files)
│   │   ├── api.ts            fetch docs tree / page / search-index from the backend
│   │   ├── docsTypes.ts      DocNode tree types + flatten helpers + docHref
│   │   ├── DocsData.tsx      context: fetches the tree once, shares it to layout + pages
│   │   ├── DocsLayout.tsx    docs shell: sidebar (from fetched tree), <Outlet/>, TOC, search
│   │   ├── DocPageView.tsx   route element: fetches a page by :slug, renders markdown
│   │   ├── DocMarkdown.tsx   react-markdown setup (gfm + raw + slug + highlight + <Media>)
│   │   ├── Media.tsx         runtime <Media> tag (img / video / gif) used inside markdown
│   │   ├── searchIndex.ts    runtime-fetched, cached search index
│   │   ├── SearchModal.tsx   Ctrl+K search over the index
│   │   ├── useToc.ts         "On this page" headings (MutationObserver, async-safe)
│   │   ├── CopyCodeButton.tsx / CodeBlockHeader.tsx / codeLanguages.tsx  code-block decorators
│   │   └── docs.css          docs styling, matches landing (black/Jersey/--accent)
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

`main.tsx` mounts `BrowserRouter`:

- `/` renders the landing `App` (scroll page, its own Navbar).
- `/features`, `/changelog`, `/faq`, `/gallery` render under `SiteLayout` (shared Navbar + Footer, scroll-to-top on change).
- `/docs` renders `DocsLayout` (wrapped in `DocsDataProvider`). `index` and `:slug` both render `DocPageView`; the index redirects to the first page. The sidebar tree and page content are fetched from the API at runtime.

`Navbar` is a 3-zone bar (brand | page links | actions). Actions = hue slider + Download CTA (`utils/download.ts`, latest GitHub `.exe`). Below 860px it collapses to a hamburger dropdown. `App` still reads `location.hash` and scrolls to the matching section on load (used by in-page anchors like `/#download`).

### Docs content (managed from the admin)

Docs are no longer files in this repo. The tree (categories/subgroups/pages) and each page's Markdown live in the `doc_nodes` table and are edited from the admin dashboard's Docs tab (`AMVerge-Website-Admin`). This site only renders them:

- `DocsData` fetches `GET /api/docs/tree` once and shares it.
- `DocPageView` fetches `GET /api/docs/page/:slug` and renders the Markdown via `DocMarkdown`.
- `searchIndex` lazy-loads `GET /api/docs/search-index` (cached) for Ctrl+K search.
- Inside Markdown, the custom `<Media src caption gif />` tag renders images/videos (parsed by `rehype-raw`, mapped to `Media`).

To add/edit/reorder pages or categories: use the admin Docs tab. No code change or redeploy needed.

### Landing scroll model

Single long page. Each section is a `<div id="...">` matching the `sections` list in `Navbar.tsx`. Navbar scroll-spy picks the closest section to viewport top and highlights it. Section reveal is `useFadeIn` (IntersectionObserver adds `.visible`).

### Accent color flow

`App.css` sets `html { --accent: lime }`. `Navbar.tsx` hue slider calls `document.documentElement.style.setProperty("--accent", hsl(...))`, so every `var(--accent)` across landing and docs updates live. Docs inherit this var, no separate accent.

### Download flow

`Landing.tsx` / `CTA.tsx` hit `api.github.com/repos/AMVerge-team/AMVerge/releases/latest`, find the first `.exe` asset (excluding `.sig`), and redirect to its `browser_download_url`. Cumulative count sums `download_count` across all releases. `counter-server.cjs` is a separate optional Postgres counter, not required for downloads to work.

## Code Conventions

- **TypeScript:** PascalCase components, camelCase vars/fns, typed props and API shapes.
- **Components:** one component per file in `components/`, default export.
- **Styling:** plain CSS, no Tailwind. Landing rules in `css/home.css`, docs rules in `css/docs.css`. Use `var(--accent)` for theme color.
- **AMVerge wordmark:** `<span>AMV</span>erge`, the `AMV` span is colored `--accent`, `erge` stays white. Match this everywhere (landing, docs, MiniUI).
- **Assets:** runtime images served from `public/` via absolute paths (`/clips/...`). Build-time imports from `src/assets/`.

## Critical Paths

| File | Role |
|---|---|
| `vite.config.ts` | Plain `react()` plugin only. Docs are runtime Markdown now, so MDX and the old `doc-sources` virtual plugin were removed. |
| `src/main.tsx` | `/docs` is `DocsDataProvider > DocsLayout` with `index` + `:slug` both rendering `DocPageView`. Tree/content come from the API, not generated routes. |
| `src/docs/api.ts` | All docs reads target `VITE_ADMIN_API_URL` (the admin backend). If unset it falls back to `http://localhost:3001`. Backend must allow this origin in CORS. |
| `src/components/Navbar.tsx` | `sections` array ids MUST match the `id=` on each landing section div, or scroll-spy and nav clicks break. Slider writes `--accent` globally. |
| `src/index.css` | `#root { text-align: center }` and `width: 80%`. Docs override both (`.docs-root { text-align: left }` + viewport breakout). Do not assume content is left-aligned by default. |
| `src/css/docs.css` | `.docs-root` breaks out of `#root`'s 80% width via `width: 100vw; margin-left: calc(-50vw + 50%)` to fill screen. Docs reuse the landing look (black bg, Jersey font, `--accent`). |
| `counter-server.cjs` | CORS `origin` list is hardcoded (localhost + a placeholder vercel domain). Update it for real deploys. Needs `DATABASE_URL`, SSL `rejectUnauthorized: false`. |
| `src/components/MiniUI.tsx` / `Explanation.tsx` | Both render a 35-cell clip grid from `/gifs/Sousou no Frieren - 01_0109..0143.gif`. Those gif files must exist in `public/gifs/`. |
| Prod deep links | Vite dev serves `/docs/installation` fine, but a static build needs SPA fallback to `index.html` or refreshing a subroute 404s. Not configured yet. |

## Origin

Promotes AMVerge (desktop app by AMVerge-team, GitHub `AMVerge-team/AMVerge`). The companion CLI/library lives in `AMVerge-CLI` (see its `AGENTS.md`). Preview gifs are from Sousou no Frieren E01.
