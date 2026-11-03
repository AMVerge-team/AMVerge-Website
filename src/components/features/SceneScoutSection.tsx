export default function SceneScoutSection() {
    return (
        <section className="feat-section feat-alt">
            <div className="feat-text">
                <h2>
                    Search for Scenes.<br />
                    <span>With Scene Scout.</span>
                </h2>
                <p>
                    Index your episodes once, then find any scene by describing it,
                    like "girl crying in the rain". Scene Scout searches a whole
                    series in about a second, and every result previews and exports
                    like any other clip.
                </p>
            </div>
            <div className="feat-visual">
                <div className="feat-media" style={{ aspectRatio: "800 / 450" }}>
                    <img src="/gifs/scenescout_showcase.gif" alt="Searching for a scene by description in Scene Scout" />
                </div>
            </div>
        </section>
    );
}
