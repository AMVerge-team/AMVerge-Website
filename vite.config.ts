import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import fs from 'node:fs'
import path from 'node:path'

// Exposes raw .mdx source as `virtual:doc-sources` (a { slug: source } map)
// for the docs search index. Avoids `?raw`, which the MDX plugin hijacks
// because it strips the query before matching the .mdx extension.
function docSources() {
  const virtualId = 'virtual:doc-sources'
  const resolvedId = '\0' + virtualId
  const dir = path.resolve(process.cwd(), 'src/docs/pages')

  return {
    name: 'doc-sources',
    resolveId(id: string) {
      if (id === virtualId) return resolvedId
    },
    load(id: string) {
      if (id !== resolvedId) return
      const map: Record<string, string> = {}
      for (const file of fs.readdirSync(dir)) {
        if (file.endsWith('.mdx')) {
          map[file.replace(/\.mdx$/, '')] = fs.readFileSync(
            path.join(dir, file),
            'utf8',
          )
        }
      }
      return `export default ${JSON.stringify(map)}`
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    docSources(),
    { enforce: 'pre', ...mdx({ remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug, rehypeHighlight] }) },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
})
