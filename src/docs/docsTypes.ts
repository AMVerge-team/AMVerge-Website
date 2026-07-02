export type DocKind = 'group' | 'page'

export type DocNode = {
  id: string
  parentId: string | null
  kind: DocKind
  slug: string | null
  label: string
  bodyMarkdown: string | null
  position: number
  isPublished: boolean
  children: DocNode[]
}

export type DocPageContent = {
  id: string
  slug: string
  label: string
  bodyMarkdown: string
}

export type DocSearchEntry = {
  slug: string
  label: string
  bodyMarkdown: string
}

// Depth-first list of page nodes, in sidebar order.
export function flattenPages(tree: DocNode[]): DocNode[] {
  const out: DocNode[] = []
  const walk = (nodes: DocNode[]) => {
    for (const node of nodes) {
      if (node.kind === 'page') out.push(node)
      if (node.children.length) walk(node.children)
    }
  }
  walk(tree)
  return out
}

export function firstPageSlug(tree: DocNode[]): string | undefined {
  return flattenPages(tree)[0]?.slug ?? undefined
}

export function docHref(slug: string): string {
  return `/docs/${slug}`
}
