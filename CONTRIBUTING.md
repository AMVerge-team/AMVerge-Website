# Contributing to AMVerge Website

Thanks for helping make the AMVerge website better.

## Reporting Issues

- Use [GitHub Issues](https://github.com/AMVerge-team/AMVerge-Website/issues)
- Describe the problem clearly — what you expected, what happened
- Include screenshots if visual

## Pull Requests

1. Fork the repo and create a branch from `main`
2. Follow the existing code conventions (see [AGENTS.md](AGENTS.md))
3. Use Conventional Commit messages: `(add)`, `(fix)`, `(update)`
4. Keep PRs focused — one change per PR
5. Run `npm run lint` before committing
6. Run `npm run build` to verify no TypeScript errors

## Development Setup

```bash
git clone https://github.com/AMVerge-team/AMVerge-Website.git
cd AMVerge-Website
npm install
npm run dev
```

## Code Style

- TypeScript with PascalCase components, camelCase variables
- One component per file, default exports
- Plain CSS in `src/css/` — no Tailwind
- Accent color via `var(--accent)` — never hardcode
- Jersey 10 font for all text

## AI Agents

An [AGENTS.md](AGENTS.md) file documents the full architecture, conventions, and critical paths for AI coding assistants.

## License

By contributing, you agree that your contributions will be licensed under the GNU GPL v3.0.
