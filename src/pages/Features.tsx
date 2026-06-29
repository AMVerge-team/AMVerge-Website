import {
    FiScissors,
    FiLayers,
    FiSend,
    FiVideo,
} from "react-icons/fi";

const clipFrames = Array.from({ length: 20 }).map((_, i) => {
    const num = String(i + 109).padStart(4, '0');
    return `/clips/Sousou no Frieren - 01_${num}.gif`;
});

export default function Features() {
    return (
        <div className="page page-features">
            {/* Header */}
            <div className="section-head">
                <span className="section-eyebrow">What it does</span>
                <h1 className="page-title">
                    Built for <span>Editors</span>
                </h1>
            </div>
            <p className="page-sub">
                Every tool you need to go from raw footage to final export, without
                opening a timeline until you're ready.
            </p>

            {/* Feature 1 — Scene Detection */}
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
                    <div className="feat-clip-stack">
                        <div className="feat-clip-row">
                            {clipFrames.slice(0, 8).map((src, i) => (
                                <img key={i} src={src} alt="" />
                            ))}
                        </div>
                        <div className="feat-clip-row">
                            {clipFrames.slice(8, 16).map((src, i) => (
                                <img key={i} src={src} alt="" />
                            ))}
                        </div>
                        <div className="feat-clip-row">
                            {clipFrames.slice(16, 20).map((src, i) => (
                                <img key={i} src={src} alt="" />
                            ))}
                        </div>
                    </div>
                    <div className="feat-arrow-icon">
                        <FiScissors />
                    </div>
                </div>
            </section>

            {/* Feature 2 — Grid Browser */}
            <section className="feat-section feat-alt">
                <div className="feat-visual">
                    <div className="feat-grid-mock">
                        {clipFrames.map((src, i) => (
                            <div key={i} className="feat-grid-cell">
                                <img src={src} alt="" />
                            </div>
                        ))}
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

            {/* Feature 3 — Smart Merge */}
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

            {/* Feature 4 — Export Everywhere */}
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

            {/* Bottom CTA */}
            <div className="feat-cta">
                <span className="section-eyebrow">Ready to try it?</span>
                <h2>
                    Stop <span className="cta-strike">Scrubbing.</span>
                    <br />
                    Start <span className="cta-accent">Selecting.</span>
                </h2>
                <a className="feat-download-btn" href="/#download">
                    <FiSend /> Download AMVerge
                </a>
            </div>
        </div>
    );
}
