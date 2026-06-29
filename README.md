<p align="center">
  <img src="https://raw.githubusercontent.com/AMVerge-team/AMVerge/main/frontend/src/assets/amverge_title_gif.gif" alt="AMVerge" width="720"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/react-19-61dafb?style=flat-square" alt="React"/>
  <img src="https://img.shields.io/badge/typescript-~6-3178c6?style=flat-square" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/vite-8-646cff?style=flat-square" alt="Vite"/>
  <img src="https://img.shields.io/badge/license-GPL--3.0-22c55e?style=flat-square" alt="License"/>
</p>

# AMVerge Website

**Marketing landing page and documentation site for AMVerge, the desktop scene selection tool for AMV editors.**

Built with React 19, TypeScript, Vite 8, and MDX.

---

## Features

- **Landing page** - Hero video background, pixel-style typography, dynamic accent color
- **Features page** - Alternating left-right layout with demo video placeholders
- **Changelog** - Live GitHub releases with dedicated per-version pages and download links
- **FAQ** - Two-column accordion with animated expand
- **Docs** - MDX-powered documentation matching the landing aesthetic
- **Live accent slider** - Hue slider rewrites `--accent` CSS variable globally

---

## Quick Start

```bash
git clone https://github.com/AMVerge-team/AMVerge-Website.git
cd AMVerge-Website
npm install
npm run dev        # http://localhost:5173
```

---

## Build

```bash
npm run build      # tsc + vite build -> dist/
npm run preview    # serve built dist/
npm run lint       # eslint
```

---

## Tech Stack

| Layer | Tech |
|---|---|
| Build | Vite 8 |
| UI | React 19 |
| Language | TypeScript ~6 |
| Routing | react-router-dom |
| Docs | MDX via `@mdx-js/rollup` |
| Fonts | Jersey 10 (Google Fonts) |
| Lint | eslint 9 + typescript-eslint |

No backend. Download counts and changelog data read live from the GitHub releases API client-side.

---

<details>
<summary><b>Repository Structure</b></summary>

```txt
src/
├── components/
│   ├── home/          Landing, About, Explanation, Merge, CTA, Contributors
│   ├── ui/            Navbar, Footer, MiniUI, SectionDivider, ContributorAvatars
│   └── features/      DetectSection, BrowseSection, MergeFeatureSection, ExportSection
├── pages/             Features, Changelog, FAQ, Gallery, ChangelogRelease
├── css/               home.css, pages.css, features.css, docs.css
├── docs/              DocsLayout, registry, MDX pages
├── services/github/   GitHub API client, releases, contributors
└── hooks/             useFadeIn, useContributors
```

</details>

---

<details>
<summary><b>AI Agents</b></summary>

An [AGENTS.md](AGENTS.md) file is included for AI coding assistants (OpenCode, Claude Code, Cursor, etc.).

Using AI without understanding the codebase is not recommended. Read the code, understand the architecture, then use the agents file if it saves you time.

</details>

---

<details>
<summary><b>Credits</b></summary>

Built by [AMVerge-team](https://github.com/AMVerge-team).

AMVerge was created by [Crptk](https://github.com/crptk). All core scene detection and clip management logic originates from the original AMVerge project.

</details>

---

<details>
<summary><b>License</b></summary>

AMVerge Website is licensed under the GNU GPL v3.0.

Any derivative work must also be open-source under the same license.

See [LICENSE](LICENSE) for the full text.

</details>
