import MiniUI from "../ui/MiniUI";
import { useFadeIn } from "../../hooks/useFadeIn";
import aboutContent from "../../content/home/about.yaml";
import { formatBrandText } from "../../utils/formatText";

export default function About() {
    const ref = useFadeIn<HTMLDivElement>();

    return (
        <div id="about" className="about-section fade-in" ref={ref}>
            <div className="about-text">
                <div className="section-head">
                    <span className="section-eyebrow">{aboutContent.eyebrow}</span>
                    <h1>
                        {aboutContent.titleLine1}<br />
                        <span>{aboutContent.titleLine2}</span>
                    </h1>
                </div>
                <p>
                    {formatBrandText(aboutContent.description)}
                </p>
            </div>
            <div className="about-ui-section">
                <div className="about-ui-glow" />
                <MiniUI />
            </div>
        </div>
    );
}

