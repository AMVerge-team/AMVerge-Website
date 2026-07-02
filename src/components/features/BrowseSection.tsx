import { FiVideo } from "react-icons/fi";

export default function BrowseSection() {
    return (
        <section className="feat-section feat-alt">
            <div className="feat-visual">
                <div className="feat-video-placeholder">
                    <FiVideo />
                    <span>Grid browsing demo</span>
                </div>
            </div>
            <div className="feat-text">
                <span className="section-eyebrow">02 / Browse</span>
                <h2>
                    See Everything.<br />
                    <span>At Once.</span>
                </h2>
                <p>
                    Every scene in a 5-column grid. No scrubbing, no jumping
                    around the timeline. Hover any cell for an instant preview.
                    Find the exact frame you need in seconds, not minutes.
                </p>
                <div className="feat-stats">
                    <div>
                        <span>5&times;</span> faster
                    </div>
                    <div>
                        <span>Hover</span> to preview
                    </div>
                </div>
            </div>
        </section>
    );
}
