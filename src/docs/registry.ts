import type { ComponentType } from 'react'
import Introduction from './pages/introduction.mdx'
import Installation from './pages/installation.mdx'
import ImportingEpisodes from './pages/importing-episodes.mdx'
import SelectingClips from './pages/selecting-clips.mdx'
import MergingScenes from './pages/merging-scenes.mdx'
import Exporting from './pages/exporting.mdx'
import Architecture from './pages/architecture.mdx'
import Contributing from './pages/contributing.mdx'
import CliOverview from './pages/cli-overview.mdx'
import CliInstallation from './pages/cli-installation.mdx'
import CliReference from './pages/cli-reference.mdx'
import CliDetection from './pages/cli-detection.mdx'
import PyPipeline from './pages/py-pipeline.mdx'
import PyDetection from './pages/py-detection.mdx'
import PyCutting from './pages/py-cutting.mdx'
import PyExport from './pages/py-export.mdx'
import PyThumbnails from './pages/py-thumbnails.mdx'
import PyVideo from './pages/py-video.mdx'
import PyUtilities from './pages/py-utilities.mdx'

export type DocPage = {
  slug: string
  label: string
  Component: ComponentType
}

export type DocGroup = {
  label: string
  pages?: DocPage[]
  subgroups?: { label: string; pages: DocPage[] }[]
}

// Sidebar categories. Order here = order in sidebar.
// The very first page across all groups is the /docs index route.
export const docGroups: DocGroup[] = [
  {
    label: 'Getting Started',
    pages: [
      { slug: 'introduction', label: 'Introduction', Component: Introduction },
      { slug: 'installation', label: 'Installation', Component: Installation },
    ],
  },
  {
    label: 'Using AMVerge',
    pages: [
      { slug: 'importing-episodes', label: 'Importing Episodes', Component: ImportingEpisodes },
      { slug: 'selecting-clips', label: 'Selecting Clips', Component: SelectingClips },
      { slug: 'merging-scenes', label: 'Merging Scenes', Component: MergingScenes },
      { slug: 'exporting', label: 'Exporting', Component: Exporting },
    ],
  },
  {
    label: 'Python Library',
    subgroups: [
      {
        label: 'Core Pipeline',
        pages: [
          { slug: 'py-pipeline', label: 'Pipeline API', Component: PyPipeline },
          { slug: 'py-video', label: 'Video & Metadata', Component: PyVideo },
        ],
      },
      {
        label: 'Scene Detection',
        pages: [
          { slug: 'py-detection', label: 'Detection Methods', Component: PyDetection },
          { slug: 'py-cutting', label: 'Scene Cutting', Component: PyCutting },
        ],
      },
      {
        label: 'Export & Output',
        pages: [
          { slug: 'py-export', label: 'Export & Codecs', Component: PyExport },
          { slug: 'py-thumbnails', label: 'Thumbnails', Component: PyThumbnails },
        ],
      },
      {
        label: 'Utilities',
        pages: [
          { slug: 'py-utilities', label: 'Diagnostics & IPC', Component: PyUtilities },
        ],
      },
    ],
  },
  {
    label: 'AMVerge CLI',
    pages: [
      { slug: 'cli-overview', label: 'Overview', Component: CliOverview },
      { slug: 'cli-installation', label: 'Installation', Component: CliInstallation },
      { slug: 'cli-reference', label: 'CLI Reference', Component: CliReference },
      { slug: 'cli-detection', label: 'Detection Methods', Component: CliDetection },
    ],
  },
  {
    label: 'Developer',
    pages: [
      { slug: 'architecture', label: 'Architecture', Component: Architecture },
      { slug: 'contributing', label: 'Contributing', Component: Contributing },
    ],
  },
]

// Flat list for route generation. First entry = /docs index.
function flattenPages(groups: DocGroup[]): DocPage[] {
  const result: DocPage[] = []
  for (const g of groups) {
    if (g.pages) result.push(...g.pages)
    if (g.subgroups) {
      for (const sg of g.subgroups) result.push(...sg.pages)
    }
  }
  return result
}

export const docs: DocPage[] = flattenPages(docGroups)

export const docsIndexSlug = docs[0]?.slug

export function docHref(slug: string) {
  return slug === docsIndexSlug ? '/docs' : `/docs/${slug}`
}
