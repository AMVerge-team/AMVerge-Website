import { docs } from './registry'
import docSources from 'virtual:doc-sources'

// docSources: { slug: rawMdxSource } provided by the doc-sources Vite plugin.

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

export const searchDocs: SearchDoc[] = docs.map((d) => {
  const md = docSources[d.slug] ?? ''
  const headings = [...md.matchAll(/^#{1,6}\s+(.+)$/gm)].map((m) =>
    stripMd(m[1]),
  )
  return { slug: d.slug, label: d.label, headings, text: stripMd(md) }
})

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
