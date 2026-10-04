import { useFadeIn } from "../../hooks/useFadeIn";
import explanationContent from "../../content/home/explanation.yaml";
import { formatBrandText } from "../../utils/formatText";

export default function Explanation() {
    const ref = useFadeIn<HTMLDivElement>();
    const { oldWay, newWay } = explanationContent;

    return (
        <div id="explanation" className="explanation-section fade-in" ref={ref}>
            <div className="explanation-pane explanation-old">
                <span className="explanation-label">{oldWay.label}</span>
                <h2>{oldWay.time}</h2>
                <div className="explanation-video">
                    <video muted loop playsInline autoPlay preload="auto">
                        <source src={oldWay.videoSrc} type="video/mp4" />
                    </video>
                </div>
                <p>
                    {formatBrandText(oldWay.description)}
                </p>
            </div>

            <div className="explanation-divider">
                <span>&rarr;</span>
            </div>

            <div className="explanation-pane explanation-new">
                <span className="explanation-label">{formatBrandText(newWay.label)}</span>
                <h2>{newWay.time}</h2>
                <div className="explanation-video">
                    <video muted loop playsInline autoPlay preload="auto">
                        <source src={newWay.videoSrc} type="video/mp4" />
                    </video>
                </div>
                <p>
                    {formatBrandText(newWay.description)}
                </p>
            </div>
        </div>
    );
}

