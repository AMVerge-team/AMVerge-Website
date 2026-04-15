import { FiDownload } from "react-icons/fi";
import { useFadeIn } from "../hooks/useFadeIn";

async function downloadLatest() {
    const res = await fetch("https://api.github.com/repos/crptk/AMVerge/releases/latest");
    const data = await res.json();
    const exe = data.assets?.find((a: { name: string }) => a.name.endsWith(".exe") && !a.name.endsWith(".sig"));
    if (exe) window.location.href = exe.browser_download_url;
}

export default function CTA() {
    const ref = useFadeIn<HTMLDivElement>();

    return (
        <div id="download" className="CTA-Wrapper fade-in" ref={ref}>
            <h1>Stop <span>Scrubbing.</span> Start <span className="selecting-word">Selecting.</span></h1>
            <button className="download-btn" onClick={downloadLatest}><FiDownload /> Download</button>
        </div>
    )
}