import { FiGrid, FiScissors, FiZap, FiLayers, FiVideo, FiSettings } from "react-icons/fi";

const features = [
    {
        icon: <FiGrid />,
        title: "Grid Scene Browsing",
        text: "Every scene of an episode shown at once. Scan a full episode in seconds instead of scrubbing a timeline.",
    },
    {
        icon: <FiScissors />,
        title: "Automatic Scene Detection",
        text: "I-Frame based cut detection splits any video into clean, individual scenes automatically.",
    },
    {
        icon: <FiZap />,
        title: "Instant Hover Preview",
        text: "Hover any clip to play it instantly. No waiting, no loading, no guessing.",
    },
    {
        icon: <FiLayers />,
        title: "Merge Scenes",
        text: "Extra cuts from fast motion or flashes? Merge selected clips back into one seamless segment.",
    },
    {
        icon: <FiVideo />,
        title: "Automatic MP4 Export",
        text: "Export selected clips, separately or merged, converted to MP4 ready for your editor.",
    },
    {
        icon: <FiSettings />,
        title: "Customizable Workflow",
        text: "Adjust grid size, sorting, and selection to fit how you actually edit.",
    },
];

export default function Features() {
    return (
        <div className="page page-features">
            <header className="page-header">
                <h1><span>Features</span></h1>
                <p>Everything AMVerge does to make scene selection fast.</p>
            </header>

            <div className="feature-grid">
                {features.map((f) => (
                    <div className="feature-card" key={f.title}>
                        <div className="feature-icon">{f.icon}</div>
                        <h2>{f.title}</h2>
                        <p>{f.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
