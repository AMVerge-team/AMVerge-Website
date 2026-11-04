import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { fetchDocsTree } from './api'
import { BUILT_IN_SLUGS, BUILT_IN_TREE } from './builtInDocs'
import { firstPageSlug, flattenPages } from './docsTypes'
import type { DocNode } from './docsTypes'

function withoutBuiltInPages(nodes: DocNode[]): DocNode[] {
  return nodes
    .filter((node) => !(node.slug && BUILT_IN_SLUGS.has(node.slug)))
    .map((node) => ({ ...node, children: withoutBuiltInPages(node.children) }))
    .filter((node) => node.kind === 'page' || node.children.length > 0)
}

type DocsDataValue = {
  tree: DocNode[]
  pages: DocNode[]
  indexSlug: string | undefined
  loading: boolean
  error: string
  reload: () => void
}

const DocsDataContext = createContext<DocsDataValue>({
  tree: [],
  pages: [],
  indexSlug: undefined,
  loading: true,
  error: '',
  reload: () => {},
})

export function DocsDataProvider({ children }: { children: ReactNode }) {
  const [tree, setTree] = useState<DocNode[]>(BUILT_IN_TREE)
  const [attempt, setAttempt] = useState(0)

  const reload = useCallback(() => setAttempt((n) => n + 1), [])

  // built-in pages show straight away; the backend only ever adds to them
  useEffect(() => {
    let cancelled = false
    fetchDocsTree()
      .then((extra) => {
        if (!cancelled) setTree([...BUILT_IN_TREE, ...withoutBuiltInPages(extra)])
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [attempt])

  const value: DocsDataValue = {
    tree,
    pages: flattenPages(tree),
    indexSlug: firstPageSlug(tree),
    loading: false,
    error: '',
    reload,
  }

  return <DocsDataContext.Provider value={value}>{children}</DocsDataContext.Provider>
}

export function useDocsData(): DocsDataValue {
  return useContext(DocsDataContext)
}
