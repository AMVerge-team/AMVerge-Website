import {
    FiGrid,
    FiScissors,
    FiEye,
    FiLayers,
    FiVideo,
    FiPackage,
    FiCpu,
    FiSend,
} from "react-icons/fi";

const features = [
    {
        icon: <FiScissors />,
        title: "Automatic Scene Detection",
        text: "Drop any video. I-Frame detection + PySceneDetect split it into clean individual scenes. No manual cutting.",
    },
    {
        icon: <FiGrid />,
        title: "Visual Grid Browser",
        text: "Every scene at once in a scrollable grid. Scan a full movie in seconds instead of scrubbing a timeline.",
    },
    {
        icon: <FiEye />,
        title: "Instant Hover Preview",
        text: "Hover any clip to preview it live. PyAV-powered thumbnails load instantly, no waiting.",
    },
    {
        icon: <FiCpu />,
        title: "Smart Scene Merging",
        text: "CLIP similarity detects adjacent scenes that belong together. Merge with one click when fast motion creates extra cuts.",
    },
    {
        icon: <FiVideo />,
        title: "Multi-Format Export",
        text: "Export as mp4, mkv, or mov. Customizable codec, bitrate, resolution, and framerate per export profile.",
    },
    {
        icon: <FiPackage />,
        title: "NLE Import",
        text: "Send clips directly to DaVinci Resolve, After Effects, CapCut, or Premiere Pro. No manual reimport.",
    },
    {
        icon: <FiLayers />,
        title: "Export Profiles",
        text: "Save export settings as reusable profiles. Switch between different codecs and resolutions for different projects.",
    },
    {
        icon: <FiSend />,
        title: "Discord Rich Presence",
        text: "Show what episode you're editing in Discord. Let your community see your workflow in real time.",
    },
];

export default function Features() {
    return (
        <div className="page page-features">
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
    )
}
