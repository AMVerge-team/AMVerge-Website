import type { ComponentType } from 'react'
import Introduction from './pages/introduction.mdx'
import Installation from './pages/installation.mdx'
import ImportingEpisodes from './pages/importing-episodes.mdx'
import SelectingClips from './pages/selecting-clips.mdx'
import MergingScenes from './pages/merging-scenes.mdx'
import Exporting from './pages/exporting.mdx'
import Architecture from './pages/architecture.mdx'
import Contributing from './pages/contributing.mdx'

export type DocPage = {
  slug: string
  label: string
  Component: ComponentType
}

export type DocGroup = {
  label: string
  pages: DocPage[]
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
    label: 'Developer',
    pages: [
      { slug: 'architecture', label: 'Architecture', Component: Architecture },
      { slug: 'contributing', label: 'Contributing', Component: Contributing },
    ],
  },
]

// Flat list for route generation. First entry = /docs index.
export const docs: DocPage[] = docGroups.flatMap((g) => g.pages)

export const docsIndexSlug = docs[0]?.slug

export function docHref(slug: string) {
  return slug === docsIndexSlug ? '/docs' : `/docs/${slug}`
}
