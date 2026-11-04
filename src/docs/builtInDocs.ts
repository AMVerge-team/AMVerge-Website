import type { DocNode, DocPageContent, DocSearchEntry } from './docsTypes'

const files = import.meta.glob('./content/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

// the sidebar: one group per product, each page is src/docs/content/<slug>.md
const STRUCTURE: { label: string; pages: { slug: string; label: string }[] }[] = [
  {
    label: 'Get Started',
    pages: [
      { slug: 'introduction', label: 'What is AMVerge?' },
      { slug: 'install-app', label: 'Install AMVerge' },
      { slug: 'quick-start', label: 'Quick Start' },
    ],
  },
  {
    label: 'AMVerge App',
    pages: [
      { slug: 'import-episodes', label: 'Import Episodes' },
      { slug: 'browse-clips', label: 'Browse and Select Clips' },
      { slug: 'export-clips', label: 'Export Clips' },
      { slug: 'scene-scout', label: 'Scene Scout' },
      { slug: 'scenepacks', label: 'Scenepacks' },
      { slug: 'depth-maps', label: 'Depth Maps' },
      { slug: 'ai-features', label: 'Turn On AI Features' },
    ],
  },
  {
    label: 'AMVerge CLI',
    pages: [
      { slug: 'cli-overview', label: 'Overview and Install' },
      { slug: 'cli-quick-start', label: 'Quick Start' },
      { slug: 'cli-commands', label: 'Command Reference' },
      { slug: 'cli-python', label: 'Python Library' },
    ],
  },
  {
    label: 'AE Extension',
    pages: [
      { slug: 'extension-overview', label: 'Overview and Install' },
      { slug: 'extension-use', label: 'Import Clips' },
    ],
  },
  {
    label: 'How It Works',
    pages: [{ slug: 'architecture', label: 'Shared Backend' }],
  },
]

export function builtInDocSource(slug: string): string {
  return files[`./content/${slug}.md`] ?? ''
}

export const BUILT_IN_TREE: DocNode[] = STRUCTURE.map((group, groupIndex) => ({
  id: `built-in-${group.label}`,
  parentId: null,
  kind: 'group',
  slug: null,
  label: group.label,
  bodyMarkdown: null,
  position: groupIndex,
  isPublished: true,
  children: group.pages.map((page, pageIndex) => ({
    id: `built-in-${page.slug}`,
    parentId: `built-in-${group.label}`,
    kind: 'page',
    slug: page.slug,
    label: page.label,
    bodyMarkdown: null,
    position: pageIndex,
    isPublished: true,
    children: [],
  })),
}))

const builtInPages = STRUCTURE.flatMap((group) => group.pages)
export const BUILT_IN_SLUGS = new Set(builtInPages.map((page) => page.slug))

export function builtInDocPage(slug: string): DocPageContent | null {
  const page = builtInPages.find((candidate) => candidate.slug === slug)
  return page ? { id: `built-in-${slug}`, slug, label: page.label, bodyMarkdown: builtInDocSource(slug) } : null
}

export const BUILT_IN_SEARCH: DocSearchEntry[] = builtInPages.map((page) => ({
  slug: page.slug,
  label: page.label,
  bodyMarkdown: builtInDocSource(page.slug),
}))
