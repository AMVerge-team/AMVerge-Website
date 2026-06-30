import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { fetchDocPage } from './api'
import { docHref } from './docsTypes'
import { useDocsData } from './DocsData'
import DocMarkdown from './DocMarkdown'
import type { DocPageContent } from './docsTypes'

type LoadState = 'loading' | 'ready' | 'missing'

export default function DocPageView() {
  const { slug } = useParams()
  const { indexSlug, loading: treeLoading } = useDocsData()
  const [page, setPage] = useState<DocPageContent | null>(null)
  const [state, setState] = useState<LoadState>('loading')

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    setState('loading')
    fetchDocPage(slug)
      .then((p) => {
        if (!cancelled) {
          setPage(p)
          setState('ready')
        }
      })
      .catch(() => {
        if (!cancelled) setState('missing')
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  // Index route (/docs): send to the first page once the tree is known.
  if (!slug) {
    if (treeLoading) return <p className="docs-loading">Loading docs...</p>
    if (indexSlug) return <Navigate to={docHref(indexSlug)} replace />
    return (
      <div className="docs-empty">
        <h1>No documentation yet</h1>
        <p>Pages published from the admin will appear here.</p>
      </div>
    )
  }

  if (state === 'loading') return <p className="docs-loading">Loading...</p>

  if (state === 'missing') {
    return (
      <div className="docs-empty">
        <h1>Page not found</h1>
        <p>This documentation page does not exist or is not published.</p>
      </div>
    )
  }

  if (!page) return null

  return <DocMarkdown source={page.bodyMarkdown} />
}
