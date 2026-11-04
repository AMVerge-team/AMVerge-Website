import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export type TocItem = { id: string; text: string; level: number }

// A heading turns active when it crosses this line, as a share of the window height.
const ACTIVE_LINE = 0.25

// Which heading is active. Near the end of the page the line slides down to the
// window's bottom edge, so headings too low to ever reach the top still get a turn.
function findActiveId(headings: HTMLElement[]): string {
  const viewport = window.innerHeight
  const maxScroll = document.documentElement.scrollHeight - viewport
  const remaining = maxScroll - window.scrollY
  const slideOver = Math.min(viewport, maxScroll)
  const progress = slideOver > 0 ? Math.min(1, Math.max(0, 1 - remaining / slideOver)) : 0
  const line = viewport * (ACTIVE_LINE + (1 - ACTIVE_LINE) * progress)

  let active = headings[0]
  for (const heading of headings) {
    if (heading.getBoundingClientRect().top <= line) active = heading
  }
  return active?.id ?? ''
}

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

    let headings: HTMLElement[] = []
    // a clicked item stays active until the reader scrolls: the page may not be able to bring it to the top
    let clickedId: string | null = null
    let frame = 0

    const update = () => {
      frame = 0
      setActiveId(clickedId ?? findActiveId(headings))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest?.('.docs-toc a')
      const id = link?.getAttribute('href')?.slice(1)
      if (id) {
        clickedId = id
        setActiveId(id)
      }
    }
    const onReaderScroll = () => {
      if (clickedId) {
        clickedId = null
        onScroll()
      }
    }

    const build = () => {
      const article = content.querySelector('article')
      headings = article ? (Array.from(article.querySelectorAll('h2[id], h3[id]')) as HTMLElement[]) : []

      setItems(
        headings.map((h) => ({
          id: h.id,
          text: h.textContent ?? '',
          level: h.tagName === 'H2' ? 2 : 3,
        })),
      )
      update()
    }

    build()
    const mutation = new MutationObserver(build)
    mutation.observe(content, { childList: true, subtree: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    document.addEventListener('click', onClick)
    window.addEventListener('wheel', onReaderScroll, { passive: true })
    window.addEventListener('touchmove', onReaderScroll, { passive: true })
    window.addEventListener('keydown', onReaderScroll)

    return () => {
      mutation.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      document.removeEventListener('click', onClick)
      window.removeEventListener('wheel', onReaderScroll)
      window.removeEventListener('touchmove', onReaderScroll)
      window.removeEventListener('keydown', onReaderScroll)
    }
  }, [pathname])

  return { items, activeId }
}
