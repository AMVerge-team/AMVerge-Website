import VideoPlayer from "./VideoPlayer";

type MediaProps = {
    src: string;
    alt?: string;
    caption?: string;
    /** force video rendering; otherwise inferred from the extension */
    video?: boolean;
    poster?: string;
    /** gif-style: autoplay + loop + muted, no controls */
    gif?: boolean;
    width?: number | string;
};

const VIDEO_RE = /\.(mp4|webm|mov|m4v|ogv)(\?.*)?$/i;

// Embed an image, GIF, or video in docs. Usage in MDX:
//   import Media from '../Media'
//   <Media src="/clips/demo.gif" caption="The clip grid" />
//   <Media src="/media/tour.mp4" gif caption="Quick tour" />
export default function Media({
    src,
    alt = "",
    caption,
    video,
    poster,
    gif,
    width,
}: MediaProps) {
    const isVideo = video ?? VIDEO_RE.test(src);
    const style = width ? { maxWidth: typeof width === "number" ? `${width}px` : width } : undefined;

    return (
        <figure className="docs-media" style={style}>
            {isVideo ? (
                gif ? (
                    // gif-style: bare looping autoplay video, no chrome
                    <video src={src} poster={poster} autoPlay loop muted playsInline preload="metadata" />
                ) : (
                    <VideoPlayer src={src} poster={poster} />
                )
            ) : (
                <img src={src} alt={alt || caption || ""} loading="lazy" />
            )}
            {caption && <figcaption>{caption}</figcaption>}
        </figure>
    );
}
