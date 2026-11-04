import { BUILT_IN_SEARCH, BUILT_IN_SLUGS, builtInDocPage } from './builtInDocs'
import type { DocNode, DocPageContent, DocSearchEntry } from './docsTypes'

const API_BASE = (import.meta.env.VITE_ADMIN_API_URL || 'http://localhost:3001').replace(/\/$/, '')

async function parseError(res: Response): Promise<string> {
  try {
    const payload = await res.json()
    if (payload?.message && typeof payload.message === 'string') return payload.message
  } catch {
    // no-op
  }
  return `Request failed with status ${res.status}`
}

// Extra pages from the admin backend, shown after the built-in ones.
export async function fetchDocsTree(): Promise<DocNode[]> {
  const res = await fetch(`${API_BASE}/api/docs/tree`)
  if (!res.ok) throw new Error(await parseError(res))
  const payload = (await res.json()) as { tree: DocNode[] }
  return payload.tree || []
}

// Returns null for a genuine 404 (page missing/unpublished); throws for network
// or server errors (e.g. the API/DB being down) so the UI can tell them apart.
export async function fetchDocPage(slug: string): Promise<DocPageContent | null> {
  const builtIn = builtInDocPage(slug)
  if (builtIn) return builtIn

  const res = await fetch(`${API_BASE}/api/docs/page/${encodeURIComponent(slug)}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(await parseError(res))
  const payload = (await res.json()) as { page: DocPageContent }
  return payload.page
}

export async function fetchDocsSearchIndex(): Promise<DocSearchEntry[]> {
  try {
    const res = await fetch(`${API_BASE}/api/docs/search-index`)
    if (!res.ok) return BUILT_IN_SEARCH
    const payload = (await res.json()) as { pages: DocSearchEntry[] }
    return [...BUILT_IN_SEARCH, ...(payload.pages || []).filter((page) => !BUILT_IN_SLUGS.has(page.slug))]
  } catch {
    return BUILT_IN_SEARCH
  }
}
