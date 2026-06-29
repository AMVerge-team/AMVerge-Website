import { FiLayers } from "react-icons/fi";
import { clipFrames } from "./clipFrames";

export default function MergeFeatureSection() {
    return (
        <section className="feat-section">
            <div className="feat-text">
                <span className="section-eyebrow">03 / Merge</span>
                <h2>
                    Fix False Cuts.<br />
                    <span>Merge with One Click.</span>
                </h2>
                <p>
                    Fast motion, camera shakes, and fight sequences create
                    extra cuts. AMVerge uses CLIP similarity to detect which
                    adjacent scenes belong together. Select them, click merge,
                    and they become one seamless clip.
                </p>
                <div className="feat-stats">
                    <div>
                        <span>CLIP</span> powered
                    </div>
                    <div>
                        <span>1-click</span> merge
                    </div>
                </div>
            </div>
            <div className="feat-visual">
                <div className="feat-merge-visual">
                    <div className="feat-merge-clips">
                        {clipFrames.slice(0, 4).map((src, i) => (
                            <img key={i} src={src} alt="" className={i > 0 ? "feat-overlap" : ""} />
                        ))}
                    </div>
                    <span className="feat-merge-arrow"><FiLayers /></span>
                    <div className="feat-merge-result">
                        <img src={clipFrames[0]} alt="" />
                    </div>
                </div>
            </div>
        </section>
    );
}
