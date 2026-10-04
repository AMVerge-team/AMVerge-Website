import { useFadeIn } from "../../hooks/useFadeIn";
import mergeContent from "../../content/home/merge.yaml";
import { formatBrandText } from "../../utils/formatText";

export default function Merge() {
    const ref = useFadeIn<HTMLDivElement>();
    const count = mergeContent.clipCount || 24;
    const startNum = mergeContent.clipStartNum || 109;
    const prefix = mergeContent.clipPrefix || "/gifs/Sousou no Frieren - 01_";

    return (
        <div id="merge-section" className="merge-info-section fade-in" ref={ref}>
            <div className="merge-info-text">
                <div className="section-head">
                    <span className="section-eyebrow">{mergeContent.eyebrow}</span>
                    <h1>
                        {mergeContent.title}
                    </h1>
                </div>
                <p>
                    {formatBrandText(mergeContent.description)}
                </p>
            </div>

            <div className="merge-clip-grid">
                {Array.from({ length: count }).map((_, i) => {
                    const num = String(i + startNum).padStart(4, '0');
                    return (
                        <div key={i} className="clip-cell">
                            <img
                                src={`${prefix}${num}.gif`}
                                alt={`clip ${num}`}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}