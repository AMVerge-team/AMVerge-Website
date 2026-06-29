import { FiVideo } from "react-icons/fi";

export default function ExportSection() {
    return (
        <section className="feat-section feat-alt">
            <div className="feat-visual">
                <div className="feat-video-placeholder">
                    <FiVideo />
                    <span>Export demo</span>
                </div>
            </div>
            <div className="feat-text">
                <span className="section-eyebrow">04 / Export</span>
                <h2>
                    Export Any Format.<br />
                    <span>Import Any Editor.</span>
                </h2>
                <p>
                    Export clips as mp4, mkv, or mov with customizable
                    codec, bitrate, resolution, and framerate. Save settings as
                    reusable profiles. Or send clips directly to DaVinci Resolve,
                    After Effects, Premiere Pro, or CapCut.
                </p>
                <div className="feat-stats">
                    <div>
                        <span>3</span> formats
                    </div>
                    <div>
                        <span>4</span> NLEs
                    </div>
                </div>
            </div>
        </section>
    );
}
