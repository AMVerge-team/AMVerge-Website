import { useFadeIn } from "../../hooks/useFadeIn";

export default function Explanation() {
    const ref = useFadeIn<HTMLDivElement>();

    return (
        <div id="explanation" className="explanation-section fade-in" ref={ref}>
            <div className="explanation-pane explanation-old">
                <span className="explanation-label">The Old Way</span>
                <h2>Hours</h2>
                <div className="explanation-video">
                    {/* TODO: swap for custom manual-cutting recording */}
                    <video muted loop playsInline autoPlay preload="auto">
                        <source src="/clips/AMVerge-Video.mp4" type="video/mp4" />
                    </video>
                </div>
                <p>
                    Scrubbing through a timeline. Frame by frame. Jumping
                    back and forth. Hoping you didn't miss the shot.
                </p>
            </div>

            <div className="explanation-divider">
                <span>&rarr;</span>
            </div>

            <div className="explanation-pane explanation-new">
                <span className="explanation-label">With <span>AMV</span>erge</span>
                <h2>Minutes</h2>
                <div className="explanation-video">
                    {/* TODO: swap for custom AMVerge usage recording */}
                    <video muted loop playsInline autoPlay preload="auto">
                        <source src="/clips/AMVerge-Video.mp4" type="video/mp4" />
                    </video>
                </div>
                <p>
                    Every scene in a visual grid. Browse an entire episode in
                    seconds. Pick exactly what you need.
                </p>
            </div>
        </div>
    )
}
