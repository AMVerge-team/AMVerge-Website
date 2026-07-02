// Placeholder showcase using the bundled Frieren preview clips.
// Swap these for real community AMVs / demo videos later.
import useSEO from "../hooks/useSEO";

const clips = Array.from({ length: 18 }).map((_, i) => {
    const num = String(i + 109).padStart(4, "0");
    return `/gifs/Sousou no Frieren - 01_${num}.gif`;
});

export default function Gallery() {
    useSEO({
        title: "Gallery",
        description: "Browse scene clips detected by AMVerge. See how the tool splits anime episodes into individual scenes ready for your AMV projects.",
    });
    return (
        <div className="page page-gallery">
            <header className="page-header">
                <h1><span>Gallery</span></h1>
                <p>Scenes pulled straight from an episode grid. Community AMVs coming soon.</p>
            </header>

            <div className="gallery-grid">
                {clips.map((src) => (
                    <div className="gallery-cell" key={src}>
                        <img src={src} alt="scene preview" loading="lazy" />
                    </div>
                ))}
            </div>
        </div>
    );
}
