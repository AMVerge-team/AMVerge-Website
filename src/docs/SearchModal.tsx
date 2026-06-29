import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { searchDocsFor } from './searchIndex'
import { docHref } from './registry'

type Props = {
  open: boolean
  onClose: () => void
}

export default function SearchModal({ open, onClose }: Props) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const results = useMemo(() => searchDocsFor(query), [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      inputRef.current?.focus()
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  if (!open) return null

  const go = (slug: string) => {
    navigate(docHref(slug))
    onClose()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      go(results[active].slug)
    }
  }

  return (
    <div className="docs-search-overlay" onClick={onClose}>
      <div
        className="docs-search-modal"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="docs-search-input">
          <FiSearch />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search docs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <span className="docs-search-kbd">Esc</span>
        </div>

        <div className="docs-search-results">
          {query && results.length === 0 && (
            <div className="docs-search-empty">No results for “{query}”</div>
          )}
          {results.map((r, i) => (
            <button
              key={r.slug}
              className={`docs-search-result ${i === active ? 'active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => go(r.slug)}
            >
              <span className="docs-search-result-label">{r.label}</span>
              <span className="docs-search-result-snippet">{r.snippet}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
