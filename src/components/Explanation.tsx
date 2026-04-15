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
                <h1>Why use <span>AMV</span>erge?</h1>
                <p>Scrubbing through long episodes is slow and inefficient. Instead 
                    of relying on single-frame previews, AMVerge displays every scene in a grid, 
                    letting you scan an entire episode in seconds and find exactly what you need. 
                    What might take 30 minutes in a traditional editor can be done in under 5 with 
                    this tool.
                </p>
            </div>
        </div>
    )
}