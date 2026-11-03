import { FiShuffle } from "react-icons/fi";

export default function MatchCutSection() {
    return (
        <section className="feat-section">
            <div className="feat-text">
                <h2>
                    Find Match Cuts,<br />
                    <span>Keep the Flow.</span>
                </h2>
                <p>
                    Pick a clip and AMVerge finds the scenes that look like they
                    could come right after it, matched on its last frame. Smooth
                    transitions without hunting through every episode yourself.
                </p>
            </div>
            <div className="feat-visual">
                <div className="feat-video-placeholder">
                    <FiShuffle />
                    <span>Match cut demo</span>
                </div>
            </div>
        </section>
    );
}
