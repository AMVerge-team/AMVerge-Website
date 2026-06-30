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
import { docHref } from './docsTypes'
import type { DocNode } from './docsTypes'
import { useDocsData } from './DocsData'
import { useToc } from './useToc'
import SearchModal from './SearchModal'
import CopyCodeButton from './CopyCodeButton'
import CodeBlockHeader from './CodeBlockHeader'
import '../css/docs.css'
import 'highlight.js/styles/github-dark.css'

// Page nodes reachable from a node (recurses through child groups).
function descendantPages(node: DocNode): DocNode[] {
  const out: DocNode[] = []
  const walk = (n: DocNode) => {
    if (n.kind === 'page') out.push(n)
    n.children.forEach(walk)
  }
  node.children.forEach(walk)
  if (node.kind === 'page') out.push(node)
  return out
}

export default function DocsLayout() {
  const location = useLocation()
  const { tree, loading, error } = useDocsData()
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

  const subtreeHasActive = (node: DocNode) =>
    descendantPages(node).some((p) => p.slug && location.pathname === docHref(p.slug))

  const activeTopGroup = tree.find(subtreeHasActive)
  const activePage = tree
    .flatMap(descendantPages)
    .find((p) => p.slug && location.pathname === docHref(p.slug))

  // A group is open if the user toggled it, otherwise open when it holds the
  // current page. Recomputed each render, so the path to the active page expands.
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  const isOpen = (node: DocNode) =>
    collapsed[node.id] !== undefined ? !collapsed[node.id] : subtreeHasActive(node)
  const toggle = (node: DocNode) =>
    setCollapsed((c) => ({ ...c, [node.id]: isOpen(node) }))

  const renderNode = (node: DocNode, depth: number) => {
    if (node.kind === 'page') {
      if (!node.slug) return null
      return (
        <NavLink
          key={node.id}
          to={docHref(node.slug)}
          end
          className={({ isActive }) => (isActive ? 'docs-link active' : 'docs-link')}
        >
          {node.label}
        </NavLink>
      )
    }

    const open = isOpen(node)
    return (
      <div key={node.id} className={`docs-subgroup depth-${depth}`}>
        <button
          className="docs-subgroup-label"
          onClick={() => toggle(node)}
          aria-expanded={open}
        >
          {node.label}
          <FiChevronRight className={`docs-chevron ${open ? 'open' : ''}`} />
        </button>
        {open && <>{node.children.map((child) => renderNode(child, depth + 1))}</>}
      </div>
    )
  }

  // Top-level groups get the prominent header style; top-level pages render as links.
  const renderTop = (node: DocNode) => {
    if (node.kind === 'page') {
      if (!node.slug) return null
      return (
        <div key={node.id} className="docs-group">
          <NavLink
            to={docHref(node.slug)}
            end
            className={({ isActive }) => (isActive ? 'docs-link active' : 'docs-link')}
          >
            {node.label}
          </NavLink>
        </div>
      )
    }

    const open = isOpen(node)
    return (
      <div key={node.id} className="docs-group">
        <button
          className="docs-group-header"
          onClick={() => toggle(node)}
          aria-expanded={open}
        >
          {node.label}
          <FiChevronRight className={`docs-chevron ${open ? 'open' : ''}`} />
        </button>
        {open && (
          <div className="docs-group-items">
            {node.children.map((child) => renderNode(child, 0))}
          </div>
        )}
      </div>
    )
  }

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
          {loading && <p className="docs-sidebar-status">Loading...</p>}
          {!loading && error && <p className="docs-sidebar-status">{error}</p>}
          {!loading && !error && tree.map(renderTop)}
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
          {activeTopGroup && (
            <div className="docs-breadcrumb">
              {activeTopGroup.label}
              {activePage && (
                <>
                  <FiChevronRight />
                  {activePage.label}
                </>
              )}
            </div>
          )}
          <article key={location.pathname} className="docs-article-anim">
            <Outlet />
            <CopyCodeButton />
            <CodeBlockHeader />
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
