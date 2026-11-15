import { useEffect, useState } from "react";
import { FiGithub } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import { useFadeIn } from "../../hooks/useFadeIn";
import DownloadDropdown from "../ui/DownloadDropdown";
import {
    fetchLatestRelease,
    fetchReleases,
    cumulativeDownloadCount,
} from "../../services/github";

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
                    <h2 className="cta-title">
                        Stop <span className="cta-strike">Scrubbing.</span>
                        <br />
                        Start <span className="cta-accent">Selecting.</span>
                    </h2>
                </div>
                <p className="cta-sub">
                    Scene selection made easy.
                </p>

                <DownloadDropdown buttonClassName="cta-download" align="center" />

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
                    Windows 10/11 · macOS{version && ` · ${version}`}
                </p>
            </div>
        </section>
    );
}
