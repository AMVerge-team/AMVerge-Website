import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { fetchDocsTree } from './api'
import { firstPageSlug, flattenPages } from './docsTypes'
import type { DocNode } from './docsTypes'

type DocsDataValue = {
  tree: DocNode[]
  pages: DocNode[]
  indexSlug: string | undefined
  loading: boolean
  error: string
}

const DocsDataContext = createContext<DocsDataValue>({
  tree: [],
  pages: [],
  indexSlug: undefined,
  loading: true,
  error: '',
})

export function DocsDataProvider({ children }: { children: ReactNode }) {
  const [tree, setTree] = useState<DocNode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      setError('')
      try {
        const next = await fetchDocsTree()
        if (!cancelled) setTree(next)
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load docs.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [])

  const value: DocsDataValue = {
    tree,
    pages: flattenPages(tree),
    indexSlug: firstPageSlug(tree),
    loading,
    error,
  }

  return <DocsDataContext.Provider value={value}>{children}</DocsDataContext.Provider>
}

export function useDocsData(): DocsDataValue {
  return useContext(DocsDataContext)
}
