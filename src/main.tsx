import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import DocsLayout from './docs/DocsLayout.tsx'
import { docs } from './docs/registry.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
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
