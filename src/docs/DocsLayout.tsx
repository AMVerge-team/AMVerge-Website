import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  FiGithub,
  FiDownload,
  FiMenu,
  FiX,
  FiChevronRight,
  FiSearch,
} from 'react-icons/fi'
import { docGroups, docHref } from './registry'
import { useToc } from './useToc'
import SearchModal from './SearchModal'
import '../css/docs.css'
import 'highlight.js/styles/github-dark.css'

export default function DocsLayout() {
  const location = useLocation()
  const [sidebarHidden, setSidebarHidden] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { items: toc, activeId } = useToc()

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileNavOpen(false)
  }, [location.pathname])

  // Ctrl/Cmd+K opens search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const activeGroup = docGroups.find((g) =>
    g.pages.some((p) => location.pathname === docHref(p.slug)),
  )
  const activePage = activeGroup?.pages.find(
    (p) => location.pathname === docHref(p.slug),
  )

  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  const isOpen = (label: string) =>
    collapsed[label] === undefined ? true : !collapsed[label]
  const toggle = (label: string) =>
    setCollapsed((c) => ({ ...c, [label]: isOpen(label) }))

  return (
    <div
      className={`docs-layout ${sidebarHidden ? 'sidebar-hidden' : ''} ${
        mobileNavOpen ? 'mobile-nav-open' : ''
      }`}
    >
      {/* ---- Mobile top bar (mobile only) ---- */}
      <div className="docs-mobilebar">
        <button
          className="docs-iconbtn"
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open menu"
        >
          <FiMenu />
        </button>
        <Link to="/" className="docs-logo">
          <span>AMV</span>erge
        </Link>
        <button
          className="docs-iconbtn"
          onClick={() => setSearchOpen(true)}
          aria-label="Search"
        >
          <FiSearch />
        </button>
      </div>

      {/* floating reopen button, shown only when desktop sidebar hidden */}
      <button
        className="docs-reopen-btn"
        onClick={() => setSidebarHidden(false)}
        aria-label="Open sidebar"
      >
        <FiMenu />
      </button>

      {/* backdrop for mobile drawer */}
      <div
        className="docs-drawer-overlay"
        onClick={() => setMobileNavOpen(false)}
      />

      {/* ---- Left sidebar ---- */}
      <aside className="docs-sidebar">
        <div className="docs-sidebar-top">
          <Link to="/" className="docs-logo">
            <span>AMV</span>erge
          </Link>
          <button
            className="docs-collapse-btn"
            onClick={() => {
              setSidebarHidden(true)
              setMobileNavOpen(false)
            }}
            aria-label="Collapse sidebar"
          >
            <FiX className="docs-collapse-close" />
            <FiMenu className="docs-collapse-menu" />
          </button>
        </div>

        <button className="docs-search" onClick={() => setSearchOpen(true)}>
          <FiSearch />
          <span className="docs-search-placeholder">Search</span>
          <span className="docs-search-kbd">Ctrl K</span>
        </button>

        <nav className="docs-tree">
          {docGroups.map((group) => {
            const open = group === activeGroup ? true : isOpen(group.label)
            return (
              <div key={group.label} className="docs-group">
                <button
                  className="docs-group-header"
                  onClick={() => toggle(group.label)}
                  aria-expanded={open}
                >
                  {group.label}
                  <FiChevronRight
                    className={`docs-chevron ${open ? 'open' : ''}`}
                  />
                </button>
                {open && (
                  <div className="docs-group-items">
                    {group.pages.map((page) => (
                      <NavLink
                        key={page.slug}
                        to={docHref(page.slug)}
                        end
                        className={({ isActive }) =>
                          isActive ? 'docs-link active' : 'docs-link'
                        }
                      >
                        {page.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        <div className="docs-sidebar-footer">
          <a
            href="https://github.com/AMVerge-team/AMVerge"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FiGithub />
          </a>
          <Link to="/#download" className="docs-footer-cta">
            <FiDownload /> Download
          </Link>
        </div>
      </aside>

      {/* ---- Center content ---- */}
      <main className="docs-content">
        <div className="docs-content-inner">
          {activeGroup && (
            <div className="docs-breadcrumb">
              {activeGroup.label}
              {activePage && (
                <>
                  <FiChevronRight />
                  {activePage.label}
                </>
              )}
            </div>
          )}
          <article>
            <Outlet />
          </article>
        </div>
      </main>

      {/* ---- Right "On this page" ---- */}
      <aside className="docs-toc">
        {toc.length > 0 && (
          <>
            <div className="docs-toc-title">On this page</div>
            <ul>
              {toc.map((item) => (
                <li
                  key={item.id}
                  className={`docs-toc-item lvl-${item.level} ${
                    activeId === item.id ? 'active' : ''
                  }`}
                >
                  <a href={`#${item.id}`}>{item.text}</a>
                </li>
              ))}
            </ul>
          </>
        )}
      </aside>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
