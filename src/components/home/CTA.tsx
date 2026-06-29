import { useEffect, useState } from "react";
import { FiDownload, FiGithub } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import { useFadeIn } from "../../hooks/useFadeIn";
import {
    fetchLatestRelease,
    fetchReleases,
    cumulativeDownloadCount,
} from "../../services/github";

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
    const ref = useFadeIn<HTMLElement>();
    const [count, setCount] = useState<number | null>(null);
    const [version, setVersion] = useState<string | null>(null);

    useEffect(() => {
        fetchReleases()
            .then((r) => setCount(cumulativeDownloadCount(r)))
            .catch(() => {});
        fetchLatestRelease()
            .then(({ release }) => setVersion(release.tag_name))
            .catch(() => {});
    }, []);

    return (
        <section id="download" className="cta-section fade-in" ref={ref}>
            <div className="cta-glow" />
            <div className="cta-inner">
                <div className="section-head">
                    <span className="section-eyebrow">Ready when you are</span>
                    <h2 className="cta-title">
                        Stop <span className="cta-strike">Scrubbing.</span>
                        <br />
                        Start <span className="cta-accent">Selecting.</span>
                    </h2>
                </div>
                <p className="cta-sub">
                    Turn hours of timeline scrubbing into seconds of browsing.
                    Free, open source, built for editors.
                </p>

                <button className="cta-download" onClick={downloadLatest}>
                    <FiDownload /> Download for Windows
                </button>

                <div className="cta-secondary">
                    <a
                        href="https://github.com/AMVerge-team/AMVerge"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FiGithub /> GitHub
                    </a>
                    <a
                        href="https://discord.com/invite/bmXjTgsAaN"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaDiscord /> Discord
                    </a>
                </div>

                <p className="cta-meta">
                    {count !== null && `${count.toLocaleString()}+ downloads · `}
                    Windows 10/11{version && ` · ${version}`}
                </p>
            </div>
        </section>
    );
}
