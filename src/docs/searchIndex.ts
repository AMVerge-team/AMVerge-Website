import { fetchDocsSearchIndex } from './api'

function stripMd(s: string) {
  return s
    .replace(/```[\s\S]*?```/g, ' ') // code fences
    .replace(/`[^`]*`/g, ' ') // inline code
    .replace(/<[^>]+>/g, ' ') // jsx/html tags
    .replace(/[#>*_[\]()|-]/g, ' ') // md punctuation
    .replace(/\s+/g, ' ')
    .trim()
}

export type SearchDoc = {
  slug: string
  label: string
  headings: string[]
  text: string
}

let searchDocs: SearchDoc[] = []
let loadPromise: Promise<void> | null = null

// Fetch the published-page index from the API once and cache it. Safe to call
// repeatedly (e.g. every time the search modal opens); only fetches on first call.
export function loadSearchIndex(): Promise<void> {
  if (!loadPromise) {
    loadPromise = fetchDocsSearchIndex()
      .then((pages) => {
        searchDocs = pages.map((p) => {
          const md = p.bodyMarkdown ?? ''
          const headings = [...md.matchAll(/^#{1,6}\s+(.+)$/gm)].map((m) => stripMd(m[1]))
          return { slug: p.slug, label: p.label, headings, text: stripMd(md) }
        })
      })
      .catch((err) => {
        loadPromise = null // allow a later retry
        throw err
      })
  }
  return loadPromise
}

export type SearchResult = {
  slug: string
  label: string
  snippet: string
}

export function searchDocsFor(query: string): SearchResult[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const scored: { doc: SearchDoc; score: number }[] = []

  for (const doc of searchDocs) {
    const label = doc.label.toLowerCase()
    const text = doc.text.toLowerCase()
    let score = 0

    if (label === q) score += 100
    else if (label.includes(q)) score += 50
    if (doc.headings.some((h) => h.toLowerCase().includes(q))) score += 20
    if (text.includes(q)) score += 5

    if (score > 0) scored.push({ doc, score })
  }

  scored.sort((a, b) => b.score - a.score)

  return scored.slice(0, 8).map(({ doc }) => {
    const idx = doc.text.toLowerCase().indexOf(q)
    let snippet = ''
    if (idx >= 0) {
      const start = Math.max(0, idx - 30)
      snippet =
        (start > 0 ? '...' : '') +
        doc.text.slice(start, idx + q.length + 50).trim() +
        '...'
    } else {
      snippet = doc.text.slice(0, 80) + '...'
    }
    return { slug: doc.slug, label: doc.label, snippet }
  })
}
