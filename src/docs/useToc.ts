import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export type TocItem = { id: string; text: string; level: number }

// Reads h2/h3 from the rendered MDX article (ids added by rehype-slug)
// and tracks which one is currently in view for the "On this page" list.
export function useToc() {
  const { pathname } = useLocation()
  const [items, setItems] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const article = document.querySelector('.docs-content article')
    if (!article) {
      setItems([])
      return
    }

    const headings = Array.from(
      article.querySelectorAll('h2[id], h3[id]'),
    ) as HTMLElement[]

    setItems(
      headings.map((h) => ({
        id: h.id,
        text: h.textContent ?? '',
        level: h.tagName === 'H2' ? 2 : 3,
      })),
    )

    if (headings.length === 0) {
      setActiveId('')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '0px 0px -75% 0px', threshold: 0 },
    )

    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [pathname])

  return { items, activeId }
}
