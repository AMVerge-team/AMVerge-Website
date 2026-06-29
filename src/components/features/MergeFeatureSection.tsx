import { FiVideo } from "react-icons/fi";

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
                <div className="feat-video-placeholder">
                    <FiVideo />
                    <span>Merge demo</span>
                </div>
            </div>
        </section>
    );
}
