# AGENTS.md - AMVerge Website

Marketing landing page + docs for AMVerge (the desktop scene-selection app by AMVerge-team). Single-page React scroll site with a small Postgres-backed download counter API. The docs and FAQ sections are rendered from content fetched at runtime from the admin backend (managed in the separate `AMVerge-Website-Admin` repo / `admin.amverge.app`), styled to match the landing.

## AI Agent Instructions

- **Update this file** when adding/removing files, changing routing, adding components, or introducing conventions.
- **Commit style:** prefix tag in parentheses: `(add)` new features, `(fix)` bug fixes, `(update)` refactors/formatting/chores. Example: `(fix) navbar: clamp active-section offset math`.
- **Commit author:** always commit under the user's account. Do NOT add a `Co-Authored-By: Claude` trailer or any self-attribution.
- **Commit per task:** separate commit after each task/logical change. Do not batch unrelated changes.
- **No em dashes:** never use `—` in any prose, docs, README, MDX, or commit messages. Use a comma, colon, parentheses, or plain hyphen `-` instead.
- **Accent color is dynamic:** all theme color comes from the CSS var `--accent`. The navbar hue slider rewrites it at runtime on `document.documentElement`, and the chosen hue persists in `localStorage` (`accent-hue`). Never hardcode the accent green, use `var(--accent)`.
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
| FAQ | Fetched from admin backend API (`GET /api/faq`), rendered as collapsible accordion |
| SEO | Custom `useSEO` hook sets per-page title, description, og:*, twitter:* meta tags |
| Icons | react-icons (Fi, Fa sets) |
| Fonts | `Jersey 10` (Google Fonts, pixel look), system-ui fallback |
| Counter API | Express + `pg` (Postgres) + cors, `counter-server.cjs` |
| Lint | eslint 9 + typescript-eslint |

Download counts read live from the GitHub releases API client-side; `counter-server.cjs` is a standalone optional download counter. Docs and FAQ content are fetched at runtime from the admin backend via `VITE_ADMIN_API_URL` (see `.env.example`). The docs section is no longer MDX/build-time.

## Directory Map

```
AMVerge-Website/
├── src/
│   ├── main.tsx              entry, BrowserRouter, routes (/ -> App, /docs -> DocsLayout, /gallery -> / redirect, * -> 404)
│   ├── App.tsx               landing page, stacks all section components
│   ├── index.css             light/dark token base (mostly overridden by home.css)
│   ├── vite-env.d.ts         import.meta.env typing (VITE_ADMIN_API_URL)
│   │
│   ├── css/
│   │   ├── home.css          real site styling: black bg, Jersey 10 font, --accent
│   │   ├── pages.css         shared styling for multi-page routes + skeletons + animations
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
│   │   │   ├── Navbar.tsx        brand | nav links | hue slider (persisted) + Download
│   │   │   ├── Footer.tsx        shared footer (links + GitHub + Discord + Donate + contributors)
│   │   │   ├── MiniUI.tsx        fake app UI mockup (clip grid + preview pane)
│   │   │   ├── SectionDivider.tsx accent gradient separator between sections
│   │   │   ├── ContributorAvatars.tsx compact overlapping avatar row
│   │   │   └── Skeleton.tsx      shimmer loading placeholders (Skeleton, SkeletonText, SkeletonCard)
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
│   │   ├── Features.tsx      feature sections with staggered fade-in
│   │   ├── Changelog.tsx     live GitHub releases list
│   │   ├── ChangelogRelease.tsx  single release detail page
│   │   ├── FAQ.tsx           collapsible Q/A accordion (fetched from admin API)
│   │   ├── Donate.tsx        donation page with card grid + CTA (Buymeacoffee)
│   │   └── NotFound.tsx      404 page with navigation card grid
│   │
│   ├── hooks/
│   │   ├── useFadeIn.ts      IntersectionObserver -> adds .visible class on scroll
│   │   └── useSEO.ts         sets document.title + og/twitter/description meta per page
│   │
│   ├── services/
│   │   ├── github/
│   │   │   ├── index.ts       re-exports all public API
│   │   │   ├── client.ts      ghFetch wrapper, headers, base types
│   │   │   ├── releases.ts    fetchLatestRelease, fetchReleases, cumulativeDownloadCount
│   │   │   └── contributors.ts fetchContributors
│   │   └── faq.ts             fetchFaqItems from admin backend (GET /api/faq)
│   │
│   ├── docs/                 runtime docs (content from the API, not files)
│   │   ├── api.ts            fetch docs tree / page / search-index from the backend
│   │   ├── docsTypes.ts      DocNode tree types + flatten helpers + docHref
│   │   ├── DocsData.tsx      context: fetches the tree once, shares it to layout + pages
│   │   ├── DocsLayout.tsx    docs shell: sidebar (from fetched tree), <Outlet/>, TOC, search
│   │   ├── DocPageView.tsx   route element: fetches a page by :slug, renders markdown
│   │   ├── DocsNotice.tsx    styled offline / empty / not-found states (retry on API/DB down)
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
├── index.html                Vite entry html (includes base og/twitter meta + description)
├── vite.config.ts            react plugin
├── package.json
└── AGENTS.md
```

## Key Architecture

### Routing

`main.tsx` mounts `BrowserRouter`:

- `/` renders the landing `App` (scroll page, its own Navbar).
- `/features`, `/changelog`, `/changelog/:tag`, `/faq`, `/donate` render under `SiteLayout` (shared Navbar + Footer, scroll-to-top on change).
- `/gallery` redirects to `/` (page removed, kept for old bookmarks).
- `/docs` renders `DocsLayout` (wrapped in `DocsDataProvider`). `index` and `:slug` both render `DocPageView`; the index redirects to the first page.
- `*` (catch-all) renders `NotFound` (custom 404 page with nav cards).

`Navbar` is a 3-zone bar (brand | page links | actions). Actions = hue slider (persisted to localStorage via `accent-hue` key) + Download CTA (`utils/download.ts`, latest GitHub `.exe`). Below 960px it collapses to a hamburger dropdown using `display: flex; justify-content: space-between` for proper left/right alignment. `App` still reads `location.hash` and scrolls to the matching section on load (used by in-page anchors like `/#download`).

### SEO (useSEO hook)

`src/hooks/useSEO.ts` manages per-page `<title>`, `og:title/description/image/url`, `twitter:*`, and `meta description` via direct DOM manipulation. Pages pass a `title` string; the hook appends `AMVerge | ` prefix unless the title already contains "AMVerge" (full-title override). Docs pages use `AMVerge Docs | {pageLabel}`. Re-run on route change via React Router.

### Docs content (managed from the admin)

Docs are no longer files in this repo. The tree (categories/subgroups/pages) and each page's Markdown live in the `doc_nodes` table and are edited from the admin dashboard's Docs tab (`AMVerge-Website-Admin`). This site only renders them:

- `DocsData` fetches `GET /api/docs/tree` once and shares it.
- `DocPageView` fetches `GET /api/docs/page/:slug` and renders the Markdown via `DocMarkdown`.
- `searchIndex` lazy-loads `GET /api/docs/search-index` (cached) for Ctrl+K search.
- Inside Markdown, the custom `<Media src caption gif />` tag renders images/videos (parsed by `rehype-raw`, mapped to `Media`).
- `DocsNotice` renders the offline/empty/not-found states. A network/5xx failure (API or DB down) shows an "offline" panel with a retry button; a real 404 (`fetchDocPage` returns `null`) shows "not found". Keep that 404-vs-error split intact.

To add/edit/reorder pages or categories: use the admin Docs tab. No code change or redeploy needed.

### FAQ content (managed from the admin)

FAQ items live in the `faq_items` table in the admin backend and are edited from the FAQ tab. This site fetches them at runtime:

- `src/services/faq.ts` calls `GET /api/faq` (public, no auth).
- `FAQ.tsx` renders the returned `{ question, answer }` items as a collapsible accordion, reusing the same `.faq-item` markup that was previously hardcoded.
- Shows a skeleton loader while fetching; a fallback empty-state if no items are published.
- To add/edit/reorder FAQ items: use the admin FAQ tab. No code change or redeploy needed.

### Landing scroll model

Single long page. Each section is a `<div id="...">` matching the `sections` list in `Navbar.tsx`. Navbar scroll-spy picks the closest section to viewport top and highlights it. Section reveal is `useFadeIn` (IntersectionObserver adds `.visible`).

### Accent color flow

`App.css` sets `html { --accent: lime }`. `Navbar.tsx` hue slider calls `document.documentElement.style.setProperty("--accent", hsl(...))` and persists the hue to `localStorage("accent-hue")`, so every `var(--accent)` across landing and docs updates live and survives page reloads. Docs inherit this var, no separate accent.

### Loading skeletons

`src/components/ui/Skeleton.tsx` provides three components for loading states:

- `Skeleton` - generic shimmer block with configurable width/height/borderRadius.
- `SkeletonText` - paragraph mockup with multiple lines (last line 65% width).
- `SkeletonCard` - card list mockup with icon + title + body placeholders.

Used on FAQ (SkeletonText), Changelog (SkeletonCard), ChangelogRelease, DocPageView, and DocsLayout. All shimmer with a 1.5s CSS `@keyframes shimmer` animation in `pages.css`.

### Animations

Two systems, both CSS-only:

- **Landing sections:** `useFadeIn` hook (`src/hooks/useFadeIn.ts`) uses IntersectionObserver to add `.visible` class on scroll into viewport. CSS transitions opacity/transform.
- **Multi-page routes:** `.fade-in-children` container class with staggered `nth-child` animation-delay rules in `pages.css`. Each page/component type needs its own CSS block (e.g., `.donate-grid.fade-in-children .feature-card`, `.page-features.fade-in-children > .feat-section`). Add both the container class and CSS rules for any new page or component that animates.

Currently animated: Features sections, Donate cards, FAQ items, Changelog entries, 404 nav cards, ChangelogRelease detail.

### Download flow

`Landing.tsx` / `CTA.tsx` hit `api.github.com/repos/AMVerge-team/AMVerge/releases/latest`, find the first `.exe` asset (excluding `.sig`), and redirect to its `browser_download_url`. Cumulative count sums `download_count` across all releases. `counter-server.cjs` is a separate optional Postgres counter, not required for downloads to work.

## Code Conventions

- **TypeScript:** PascalCase components, camelCase vars/fns, typed props and API shapes.
- **Components:** one component per file in `components/`, default export.
- **Styling:** plain CSS, no Tailwind. Landing rules in `css/home.css`, docs rules in `css/docs.css`, multi-page rules in `css/pages.css`. Use `var(--accent)` for theme color.
- **AMVerge wordmark:** `<span>AMV</span>erge`, the `AMV` span is colored `--accent`, `erge` stays white. Match this everywhere (landing, docs, MiniUI).
- **Assets:** runtime images served from `public/` via absolute paths (`/clips/...`). Build-time imports from `src/assets/`.
- **Animations:** use CSS only, no JS animation libraries. Landing sections use `useFadeIn` hook (IntersectionObserver adds `.visible`). Multi-page routes use `.fade-in-children` with staggered `nth-child` delays in `pages.css`. Add both the container class and CSS rules for each new page/component that animates.
- **Loading states:** use `Skeleton`/`SkeletonText`/`SkeletonCard` from `components/ui/Skeleton.tsx`. Never use plain "Loading..." text strings.
- **SEO:** every page must call `useSEO()` with at minimum a `title`. The hook handles the `AMVerge | ` prefix unless the title already contains "AMVerge". Docs pages use the `AMVerge Docs | {label}` override pattern.

## Critical Paths

| File | Role |
|---|---|
| `vite.config.ts` | Plain `react()` plugin only. Docs are runtime Markdown now, so MDX and the old `doc-sources` virtual plugin were removed. |
| `src/main.tsx` | `/docs` is `DocsDataProvider > DocsLayout` with `index` + `:slug` both rendering `DocPageView`. Tree/content come from the API, not generated routes. Also defines 404 catch-all and `/gallery` redirect. |
| `src/docs/api.ts` | All docs reads target `VITE_ADMIN_API_URL` (the admin backend). If unset it falls back to `http://localhost:3001`. Backend must allow this origin in CORS. |
| `src/services/faq.ts` | Fetches FAQ items from admin backend. Same `VITE_ADMIN_API_URL` env var. |
| `src/hooks/useSEO.ts` | Manages `<title>` + og/twitter/description meta. `title.includes("AMVerge")` check skips `AMVerge | ` prefix for full-title overrides. |
| `src/components/Navbar.tsx` | `sections` array ids MUST match the `id=` on each landing section div, or scroll-spy and nav clicks break. Slider writes `--accent` globally + persists hue to localStorage. Mobile breakpoint: 960px. |
| `src/index.css` | `#root { text-align: center }` and `width: 80%`. Docs override both (`.docs-root { text-align: left }` + viewport breakout). Do not assume content is left-aligned by default. |
| `src/css/docs.css` | `.docs-root` breaks out of `#root`'s 80% width via `width: 100vw; margin-left: calc(-50vw + 50%)` to fill screen. Docs reuse the landing look (black bg, Jersey font, `--accent`). |
| `counter-server.cjs` | CORS `origin` list is hardcoded (localhost + a placeholder vercel domain). Update it for real deploys. Needs `DATABASE_URL`, SSL `rejectUnauthorized: false`. |
| `src/components/MiniUI.tsx` / `Explanation.tsx` | Both render a 35-cell clip grid from `/gifs/Sousou no Frieren - 01_0109..0143.gif`. Those gif files must exist in `public/gifs/`. |
| Prod deep links | Vite dev serves `/docs/installation` fine, but a static build needs SPA fallback to `index.html` or refreshing a subroute 404s. Not configured yet. |
| `src/components/ui/Skeleton.tsx` | All loading states across the site use this component. Add new variants here if needed; never use plain text loading indicators. |

## Origin

Promotes AMVerge (desktop app by AMVerge-team, GitHub `AMVerge-team/AMVerge`). The companion CLI/library lives in `AMVerge-CLI` (see its `AGENTS.md`). Preview gifs are from Sousou no Frieren E01.
