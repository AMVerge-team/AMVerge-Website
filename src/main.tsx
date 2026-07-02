import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import DocsLayout from './docs/DocsLayout.tsx'
import DocPageView from './docs/DocPageView.tsx'
import { DocsDataProvider } from './docs/DocsData.tsx'
import SiteLayout from './layouts/SiteLayout.tsx'
import Features from './pages/Features.tsx'
import Changelog from './pages/Changelog.tsx'
import ChangelogRelease from './pages/ChangelogRelease.tsx'
import FAQ from './pages/FAQ.tsx'
import Donate from './pages/Donate.tsx'
import NotFound from './pages/NotFound.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route element={<SiteLayout />}>
          <Route path="/features" element={<Features />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/changelog/:tag" element={<ChangelogRelease />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/gallery" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route
          path="/docs"
          element={
            <DocsDataProvider>
              <DocsLayout />
            </DocsDataProvider>
          }
        >
          <Route index element={<DocPageView />} />
          <Route path=":slug" element={<DocPageView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
