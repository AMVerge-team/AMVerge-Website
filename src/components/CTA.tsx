import { FiDownload } from "react-icons/fi";
import { useFadeIn } from "../hooks/useFadeIn";
import { fetchLatestRelease } from "../services/github";

async function downloadLatest() {
    try {
        const { exe } = await fetchLatestRelease();
        if (exe?.browser_download_url) {
            window.location.href = exe.browser_download_url;
        }
    } catch {
        // best-effort
    }
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
