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

export async function fetchDocsTree(): Promise<DocNode[]> {
  const res = await fetch(`${API_BASE}/api/docs/tree`)
  if (!res.ok) throw new Error(await parseError(res))
  const payload = (await res.json()) as { tree: DocNode[] }
  return payload.tree || []
}

// Returns null for a genuine 404 (page missing/unpublished); throws for network
// or server errors (e.g. the API/DB being down) so the UI can tell them apart.
export async function fetchDocPage(slug: string): Promise<DocPageContent | null> {
  const res = await fetch(`${API_BASE}/api/docs/page/${encodeURIComponent(slug)}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error(await parseError(res))
  const payload = (await res.json()) as { page: DocPageContent }
  return payload.page
}

export async function fetchDocsSearchIndex(): Promise<DocSearchEntry[]> {
  const res = await fetch(`${API_BASE}/api/docs/search-index`)
  if (!res.ok) throw new Error(await parseError(res))
  const payload = (await res.json()) as { pages: DocSearchEntry[] }
  return payload.pages || []
}
