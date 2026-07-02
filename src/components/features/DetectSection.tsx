import { FiVideo } from "react-icons/fi";

export default function DetectSection() {
    return (
        <section className="feat-section">
            <div className="feat-text">
                <span className="section-eyebrow">01 / Detect</span>
                <h2>
                    Drop a Video.<br />
                    <span>Get Every Scene.</span>
                </h2>
                <p>
                    AMVerge uses I-Frame detection and PySceneDetect to
                    automatically split any video into individual scenes. No
                    manual cutting, no markers, no timeline. Just drop the file
                    and watch it build a grid of every shot.
                </p>
                <div className="feat-stats">
                    <div>
                        <span>100%</span> automatic
                    </div>
                    <div>
                        <span>&lt;1 min</span> per episode
                    </div>
                </div>
            </div>
            <div className="feat-visual">
                <div className="feat-video-placeholder">
                    <FiVideo />
                    <span>Detection demo</span>
                </div>
            </div>
        </section>
    );
}
