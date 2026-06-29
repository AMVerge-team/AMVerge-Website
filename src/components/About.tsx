import MiniUI from "./MiniUI";
import { useFadeIn } from "../hooks/useFadeIn";

export default function About() {
    const ref = useFadeIn<HTMLDivElement>();

    return (
        <div id="about" className="about-section fade-in section-divider" ref={ref}>
            <div className="about-text">
                <div className="section-head">
                    <span className="section-eyebrow">Browse, don't scrub</span>
                    <h1>
                        Your Episode.<br />
                        <span>Instantly Browsable.</span>
                    </h1>
                </div>
                <p>
                    Drop any video into <span>AMV</span>erge and get a grid of every scene.
                    No timeline scrubbing. No manual cuts. Just browse, pick, export.
                </p>
            </div>
            <div className="about-ui-section">
                <div className="about-ui-glow" />
                <MiniUI />
            </div>
        </div>
    )
}
