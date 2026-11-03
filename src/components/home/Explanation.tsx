import { FaArrowRight } from "react-icons/fa";
import { useFadeIn } from "../../hooks/useFadeIn";

export default function Explanation() {
    const ref = useFadeIn<HTMLDivElement>();

    return (
        <div id="explanation" className="explanation-section fade-in" ref={ref}>
            <div className="explanation-pane explanation-old">
                <span className="explanation-label">Traditional Editors</span>
                <h2>Hours</h2>
                <div className="explanation-video">
                    <video muted loop playsInline autoPlay preload="auto">
                        <source src="/clips/AE Manual Clips Splitting.mp4" type="video/mp4" />
                    </video>
                </div>
                <p>
                    Scrubbing through a timeline frame by frame, praying you didn't miss a good scene.
                </p>
            </div>

            <div className="explanation-divider">
                <FaArrowRight aria-hidden="true" />
            </div>

            <div className="explanation-pane explanation-new">
                <span className="explanation-label">With <span>AMV</span>erge</span>
                <h2>Minutes</h2>
                <div className="explanation-video">
                    <video muted loop playsInline autoPlay preload="auto">
                        <source src="/clips/AMVerge Scene Splitting.mp4" type="video/mp4" />
                    </video>
                </div>
                <p>
                    Every scene in a visual grid, letting you browse an entire episode in
                    seconds.
                </p>
            </div>
        </div>
    )
}
