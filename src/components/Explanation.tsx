import { useFadeIn } from "../hooks/useFadeIn";

export default function Explanation() {
    const ref = useFadeIn<HTMLDivElement>();

    return (
        <div id="explanation" className="explanation-section fade-in" ref={ref}>
            <div className="explanation-pane explanation-old">
                <span className="explanation-label">The Old Way</span>
                <h2>Hours</h2>
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
                <div className="explanation-clip-grid">
                    {Array.from({ length: 35 }).map((_, i) => {
                        const num = String(i + 109).padStart(4, '0');
                        return (
                            <div key={i} className="clip-cell">
                                <img
                                    src={`/clips/Sousou no Frieren - 01_${num}.gif`}
                                    alt={`clip ${num}`}
                                />
                            </div>
                        );
                    })}
                    <div className="explanation-fade-top"></div>
                    <div className="explanation-fade-bottom"></div>
                    <div className="explanation-fade-left"></div>
                    <div className="explanation-fade-right"></div>
                </div>
                <p>
                    Every scene in a visual grid. Browse an entire episode in
                    seconds. Pick exactly what you need.
                </p>
            </div>
        </div>
    )
}
