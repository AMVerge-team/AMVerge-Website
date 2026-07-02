import VideoPlayer from './VideoPlayer'

// Runtime <Media> tag used inside doc markdown (parsed by rehype-raw, so props
// arrive as strings / empty-string-for-boolean rather than real booleans).
type MediaProps = {
  src?: string
  alt?: string
  caption?: string
  video?: unknown
  poster?: string
  gif?: unknown
  width?: string | number
}

const VIDEO_RE = /\.(mp4|webm|mov|m4v|ogv)(\?.*)?$/i

// rehype-raw gives bare attributes (e.g. `gif`) the value "" — treat presence as true.
const present = (value: unknown) => value !== undefined && value !== false && value !== null

export default function Media({ src, alt = '', caption, video, poster, gif, width }: MediaProps) {
  if (!src) return null

  const isVideo = present(video) || VIDEO_RE.test(src)
  const isGif = present(gif)
  const style = width
    ? { maxWidth: typeof width === 'number' ? `${width}px` : width }
    : undefined

  return (
    <figure className="docs-media" style={style}>
      {isVideo ? (
        isGif ? (
          <video src={src} poster={poster} autoPlay loop muted playsInline preload="metadata" />
        ) : (
          <VideoPlayer src={src} poster={poster} />
        )
      ) : (
        <img src={src} alt={alt || caption || ''} loading="lazy" />
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
