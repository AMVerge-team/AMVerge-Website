import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export type TocItem = { id: string; text: string; level: number }

// Reads h2/h3 from the rendered doc article (ids added by rehype-slug) and
// tracks which one is in view. Content loads asynchronously, so a MutationObserver
// rebuilds the list whenever the article DOM changes.
export function useToc() {
  const { pathname } = useLocation()
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const content = document.querySelector('.docs-content')
    if (!content) {
      setItems([])
      return
    }

    let intersection: IntersectionObserver | null = null

    const build = () => {
      const article = content.querySelector('article')
      const headings = article
        ? (Array.from(article.querySelectorAll('h2[id], h3[id]')) as HTMLElement[])
        : []

      setItems(
        headings.map((h) => ({
          id: h.id,
          text: h.textContent ?? '',
          level: h.tagName === 'H2' ? 2 : 3,
        })),
      )

      intersection?.disconnect()
      if (headings.length === 0) {
        setActiveId('')
        return
      }

      intersection = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          if (visible[0]) setActiveId(visible[0].target.id)
        },
        { rootMargin: '0px 0px -75% 0px', threshold: 0 },
      )
      headings.forEach((h) => intersection?.observe(h))
    }

    build()
    const mutation = new MutationObserver(build)
    mutation.observe(content, { childList: true, subtree: true })

    return () => {
      mutation.disconnect()
      intersection?.disconnect()
    }
  }, [pathname])

  return { items, activeId }
}
