export type Feature = {
    name: string;
    description: string;
};

export type FeatureSection = {
    id: string;
    title: string;
    summary: string;
    demo?: { src: string; alt: string; aspectRatio: string };
    features: Feature[];
};

export const FEATURE_SECTIONS: FeatureSection[] = [
    {
        id: "scene-detection",
        title: "Scene Detection",
        summary: "Drop in an episode and get every scene as its own clip.",
        demo: {
            src: "/gifs/scene_scroll_showcase.gif",
            alt: "AMVerge splitting an episode into a grid of scenes",
            aspectRatio: "800 / 434",
        },
        features: [
            { name: "Keyframe detection", description: "Nearly instant, works on any PC. Cuts at the video's keyframes." },
            { name: "AI scene detection", description: "The most accurate cuts using TransNetV2."},
            { name: "GPU decoding", description: "Speeds up AI detection on supported GPUs."},
            { name: "Batch import", description: "Queue several episodes at once." },
            { name: "Video formats", description: "MP4, MKV, MOV, WebM, AVI, M4V and TS." },
        ],
    },
    {
        id: "browsing",
        title: "Browsing Clips",
        summary: "Skim a whole episode in less than a minute.",
        features: [
            { name: "Scene grid", description: "Every scene as a tile. Ctrl + Scroll changes the column count." },
            { name: "Hover preview", description: "Hover a tile to play it, with or without audio." },
            { name: "Preview All", description: "Play every visible tile at once." },
            { name: "Selection", description: "Ctrl + Click picks clips, Shift + Click picks a range." },
            { name: "Preview language", description: "Choose which audio track clips play and export with." },
            { name: "Episode panel", description: "Keep episodes in folders, and reopen each where you left off." },
            { name: "Quick navigation", description: "Jump to any episode, scenepack, action or setting." },
        ],
    },
    {
        id: "scene-scout",
        title: "Scene Scout",
        summary: "Search your episodes by describing a scene.",
        demo: {
            src: "/gifs/scenescout_showcase.gif",
            alt: "Searching for a scene by description in Scene Scout",
            aspectRatio: "800 / 450",
        },
        features: [
            { name: "Text search", description: "Type what you want, like \"girl crying in the rain\"." },
            { name: "Databases", description: "Index a show once, then search one or several shows together." },
            { name: "Episode filter", description: "Narrow a search to the episodes you pick." },
            { name: "Skip openings and endings", description: "Leave out the first and last 2:30 of each episode." },
            { name: "Flow", description: "Pick a clip and find scenes that look like they come right after it." },
            { name: "Reuse your imports", description: "Index episodes you already cut, without detecting scenes again." },
        ],
    },
    {
        id: "scenepacks",
        title: "Scenepacks",
        summary: "Keep your favorite clips together.",
        features: [
            { name: "Collections", description: "Group clips from any episode into named packs." },
            { name: "Export", description: "Preview and export a pack's clips like any others." },
        ],
    },
    {
        id: "export",
        title: "Export",
        summary: "Multiple options for exporting depending on your needs.",
        features: [
            { name: "Fast Remux", description: "Lossless stream copy. Scenes that don't sit on keyframes re-encode so every clip stays exact." },
            { name: "Re-encode", description: "Frame-exact cuts in the codec you choose." },
            { name: "Video codecs", description: "H.264, H.265 and ProRes." },
            { name: "Audio", description: "Copy, AAC, PCM, MP3 or none." },
            { name: "GPU encoding", description: "NVIDIA NVENC for H.264 and H.265, with a CPU fallback." },
            { name: "Merge", description: "Join clips into one file, best for cuts that are on the same scenes so you could merge them." },
            { name: "Profiles", description: "Save your export settings and switch between them." },
            { name: "DaVinci Resolve", description: "Send exported clips straight to your timeline (Studio only)." },
            { name: "Depth maps", description: "Create a depth map of the clips you pick after exporting." },
        ],
    },
    {
        id: "app",
        title: "Other Features",
        summary: "The rest of what comes with AMVerge.",
        features: [
            { name: "Community events", description: "Browse and promote editing contests on the app for free." },
            { name: "Themes", description: "Pick your accent color, background image or video, font and text size." },
            { name: "Pin window", description: "Keep AMVerge floating above your editor." },
            { name: "Platforms", description: "Windows and macOS" },
        ],
    },
];
