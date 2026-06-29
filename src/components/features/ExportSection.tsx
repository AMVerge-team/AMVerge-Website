import { FiVideo } from "react-icons/fi";

export default function ExportSection() {
    return (
        <section className="feat-section feat-alt">
            <div className="feat-visual">
                <div className="feat-export-visual">
                    <div className="feat-export-badge"><FiVideo /> mp4</div>
                    <div className="feat-export-badge">mkv</div>
                    <div className="feat-export-badge">mov</div>
                    <div className="feat-export-divider" />
                    <div className="feat-export-targets">
                        <span>DaVinci</span>
                        <span>Premiere</span>
                        <span>After Effects</span>
                        <span>CapCut</span>
                    </div>
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
