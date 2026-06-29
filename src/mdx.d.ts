declare module '*.mdx' {
  import type { ComponentType } from 'react'
  const MDXComponent: ComponentType
  export default MDXComponent
}

declare module 'virtual:doc-sources' {
  const sources: Record<string, string>
  export default sources
}
