import { useEffect, useState } from "react";
import { FiDownload, FiChevronDown, FiExternalLink } from "react-icons/fi";
import { fetchReleases } from "../services/github";
import type { GithubRelease } from "../services/github";

function getExeAsset(rel: GithubRelease) {
    return rel.assets?.find(
        (a) => a.name.endsWith(".exe") && !a.name.endsWith(".sig"),
    );
}

function renderBody(body: string) {
    return body
        .replace(/### /g, "")
        .replace(/## /g, "")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .replace(/`(.*?)`/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .trim();
}

export default function Changelog() {
    const [releases, setReleases] = useState<GithubRelease[] | null>(null);
    const [error, setError] = useState(false);
    const [expanded, setExpanded] = useState<Record<number, boolean>>({});

    useEffect(() => {
        fetchReleases()
            .then((data) => setReleases(data))
            .catch(() => setError(true));
    }, []);

    const toggle = (id: number) =>
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

    return (
        <div className="page page-changelog">
            <div className="section-head">
                <span className="section-eyebrow">Release history</span>
                <h1 className="page-title">
                    <span>Changelog</span>
                </h1>
            </div>
            <p className="page-sub">
                Every update, fix, and feature. Pulled live from GitHub.
            </p>

            {error && (
                <p className="page-muted">
                    Could not load releases. See them on{" "}
                    <a
                        href="https://github.com/AMVerge-team/AMVerge/releases"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                    .
                </p>
            )}

            {!error && releases === null && (
                <p className="page-muted">Loading releases...</p>
            )}

            {!error && releases?.length === 0 && (
                <p className="page-muted">No releases published yet.</p>
            )}

            {releases && (
                <div className="changelog-list">
                    {releases.map((rel, i) => {
                        const exe = getExeAsset(rel);
                        const isExpanded = expanded[rel.id] ?? false;
                        const isLatest = i === 0;
                        const date = new Date(rel.published_at).toLocaleDateString(
                            undefined,
                            { year: "numeric", month: "long", day: "numeric" },
                        );

                        return (
                            <article
                                className={`changelog-entry ${isLatest ? "changelog-latest" : ""}`}
                                key={rel.id}
                                id={rel.tag_name}
                            >
                                <div className="changelog-head">
                                    <div className="changelog-info">
                                        <span className="changelog-tag">
                                            {rel.tag_name}
                                        </span>
                                        {isLatest && (
                                            <span className="changelog-badge">Latest</span>
                                        )}
                                    </div>
                                    <time>{date}</time>
                                </div>

                                <h2 className="changelog-name">
                                    {rel.name || rel.tag_name}
                                </h2>

                                {rel.body && (
                                    <>
                                        <div
                                            className={`changelog-body-wrap ${isExpanded ? "open" : ""}`}
                                        >
                                            <pre className="changelog-body">
                                                {renderBody(rel.body)}
                                            </pre>
                                        </div>
                                        <button
                                            className="changelog-expand"
                                            onClick={() => toggle(rel.id)}
                                        >
                                            <FiChevronDown
                                                className={`changelog-expand-icon ${isExpanded ? "open" : ""}`}
                                            />
                                            {isExpanded ? "Collapse" : "Expand"}
                                        </button>
                                    </>
                                )}

                                <div className="changelog-actions">
                                    {exe && (
                                        <a
                                            className="changelog-dl"
                                            href={exe.browser_download_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FiDownload />
                                            {exe.name}
                                        </a>
                                    )}
                                    <a
                                        className="changelog-gh"
                                        href={rel.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FiExternalLink /> GitHub
                                    </a>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
