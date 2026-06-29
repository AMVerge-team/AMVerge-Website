import { useFadeIn } from "../hooks/useFadeIn";

export default function Explanation() {
    const ref = useFadeIn<HTMLDivElement>();

    return (
        <div id="explanation" className="explanation-section fade-in" ref={ref}>
            <div className="explanation-ui-wrapper">
                <div className="explanation-ui-inner">
                    <div className="explanation-grid">
                        {Array.from({ length: 35 }).map((_, i) => {
                            const num = String(i + 109).padStart(4, '0');
                            return (
                                <div key={i} className="clip-cell">
                                    <img src={`/clips/Sousou no Frieren - 01_${num}.gif`} alt={`clip ${num}`} />
                                </div>
                            );
                        })}
                    </div>
                    <div className="explanation-fade-top"></div>
                    <div className="explanation-fade-bottom"></div>
                    <div className="explanation-fade-left"></div>
                    <div className="explanation-fade-right"></div>
                </div>
            </div>
            <div className="explanation-text">
                <h1>
                    <span>Scenes,</span> Not Timelines.
                </h1>
                <div className="explanation-stat">
                    <span>30 min</span>
                    <span className="explanation-stat-arrow">&rarr;</span>
                    <span>5 min</span>
                </div>
                <p>
                    Traditional editing means scrubbing back and forth through a timeline.
                    <span>AMV</span>erge lays out every scene in a visual grid so
                    you can scan an entire episode in seconds and find exactly what
                    you need.
                </p>
            </div>
        </div>
    )
}
