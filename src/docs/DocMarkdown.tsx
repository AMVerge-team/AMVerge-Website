import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import Media from './Media'

// `media` maps the custom <Media> tag (lowercased by the HTML parser) to a component.
const components = { media: Media } as unknown as Components

// rehype-raw must run first so raw HTML/<Media> becomes real hast nodes that
// rehype-slug (heading ids for the TOC) and rehype-highlight then operate on.
export default function DocMarkdown({ source }: { source: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSlug, rehypeHighlight]}
      components={components}
    >
      {source}
    </ReactMarkdown>
  )
}
