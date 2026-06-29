import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import DocsLayout from './docs/DocsLayout.tsx'
import { docs } from './docs/registry.ts'
import SiteLayout from './layouts/SiteLayout.tsx'
import Features from './pages/Features.tsx'
import Changelog from './pages/Changelog.tsx'
import FAQ from './pages/FAQ.tsx'
import Gallery from './pages/Gallery.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route element={<SiteLayout />}>
          <Route path="/features" element={<Features />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/gallery" element={<Gallery />} />
        </Route>
        <Route path="/docs" element={<DocsLayout />}>
          {docs.map(({ slug, Component }, i) => (
            <Route
              key={slug}
              index={i === 0}
              path={i === 0 ? undefined : slug}
              element={<Component />}
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
