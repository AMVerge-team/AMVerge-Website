import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { fetchDocPage } from './api'
import { docHref } from './docsTypes'
import { useDocsData } from './DocsData'
import DocMarkdown from './DocMarkdown'
import DocsNotice from './DocsNotice'
import useSEO from '../hooks/useSEO'
import type { DocPageContent } from './docsTypes'

type LoadState = 'loading' | 'ready' | 'notfound' | 'offline'

export default function DocPageView() {
  const { slug } = useParams()
  const { indexSlug, loading: treeLoading, error: treeError, reload } = useDocsData()
  const [page, setPage] = useState<DocPageContent | null>(null)
  const [state, setState] = useState<LoadState>('loading')
  const [attempt, setAttempt] = useState(0)

  useSEO({
    title: page?.label ? `AMVerge | Documentation - ${page.label}` : "AMVerge | Documentation",
    description: page?.label ? `AMVerge documentation: ${page.label}. Learn how to use the free scene selection tool.` : "AMVerge documentation. Guides, installation, and usage for the free scene selection tool.",
  })

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    setState('loading')
    fetchDocPage(slug)
      .then((p) => {
        if (cancelled) return
        if (p) {
          setPage(p)
          setState('ready')
        } else {
          setState('notfound')
        }
      })
      .catch(() => {
        if (!cancelled) setState('offline')
      })
    return () => {
      cancelled = true
    }
  }, [slug, attempt])

  // Index route (/docs): wait for the tree, then send to the first page.
  if (!slug) {
    if (treeLoading) return <DocsNotice variant="empty" />
    if (treeError) return <DocsNotice variant="offline" onRetry={reload} />
    if (indexSlug) return <Navigate to={docHref(indexSlug)} replace />
    return <DocsNotice variant="empty" />
  }

  if (state === 'loading') return <p className="docs-loading">Loading...</p>
  if (state === 'offline') {
    return <DocsNotice variant="offline" onRetry={() => setAttempt((n) => n + 1)} />
  }
  if (state === 'notfound') return <DocsNotice variant="notfound" />
  if (!page) return null

  return <DocMarkdown source={page.bodyMarkdown} />
}
