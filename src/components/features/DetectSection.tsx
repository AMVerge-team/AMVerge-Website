export default function DetectSection() {
    return (
        <section className="feat-section">
            <div className="feat-text">
                <h2>
                    Drop a Video,<br />
                    <span>Get Every Scene.</span>
                </h2>
                <p>
                    Drop in an episode and AMVerge splits it into every scene in
                    about a minute. Use fast keyframe detection, or turn on AI scene
                    detection for cuts that land right on the scene change. No manual
                    cutting, no timeline, just a grid of every shot.
                </p>
            </div>
            <div className="feat-visual">
                <div className="feat-media" style={{ aspectRatio: "800 / 434" }}>
                    <img src="/gifs/scene_scroll_showcase.gif" alt="AMVerge splitting an episode into a grid of scenes" />
                </div>
            </div>
        </section>
    );
}
