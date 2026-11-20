import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronRight, FiDownload } from "react-icons/fi";
import { FaWindows, FaApple, FaLinux } from "react-icons/fa";
import { fetchReleases } from "../services/github";
import useSEO from "../hooks/useSEO";
import { SkeletonCard } from "../components/ui/Skeleton";
import type { GithubRelease } from "../services/github";

function getExcerpt(body: string | null) {
    if (!body) return null;
    for (const rawLine of body.trim().split("\n")) {
        const line = rawLine.trim();
        if (!line || line.startsWith("#") || /^[-*_]{3,}$/.test(line)) continue;
        const clean = line.replace(/^[-*]\s+/, "").replace(/\*\*/g, "");
        if (clean.length <= 80) return clean;
        return clean.slice(0, 80) + "...";
    }
    return null;
}

function getReleaseDownloads(rel: GithubRelease) {
    let count = 0;
    for (const a of rel.assets ?? []) {
        if (!a.name.endsWith(".sig") && !a.name.endsWith("latest.json")) {
            count += a.download_count;
        }
    }
    return count;
}

function hasPlatform(rel: GithubRelease, ext: string) {
    return (rel.assets ?? []).some((a) => a.name.endsWith(ext));
}

export default function Changelog() {
    const [releases, setReleases] = useState<GithubRelease[] | null>(null);
    const [error, setError] = useState(false);

    useSEO({
        title: "Changelog",
        description: "AMVerge release history and changelog. See what's new in each version, download the latest build for Windows, macOS, and Linux.",
    });

    useEffect(() => {
        fetchReleases()
            .then((data) => setReleases(data))
            .catch(() => setError(true));
    }, []);

    return (
        <div className="page page-changelog">
            <div className="section-head">
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
                <SkeletonCard count={5} />
            )}

            {!error && releases?.length === 0 && (
                <p className="page-muted">No releases published yet.</p>
            )}

            {releases && (
                <div className="changelog-list fade-in-children">
                    {releases.map((rel, i) => {
                        const date = new Date(rel.published_at).toLocaleDateString(
                            undefined,
                            { year: "numeric", month: "short", day: "numeric" },
                        );
                        const isLatest = i === 0;
                        const excerpt = getExcerpt(rel.body);
                        const dls = getReleaseDownloads(rel);

                        return (
                            <Link
                                to={`/changelog/${rel.tag_name}`}
                                className={`changelog-entry ${isLatest ? "changelog-latest" : ""}`}
                                key={rel.id}
                            >
                                <div className="changelog-entry-inner">
                                    <div className="changelog-left">
                                        <div className="changelog-head">
                                            <span className="changelog-tag">
                                                <img src="/LogoAMVergeFull.png" alt="" className="changelog-card-logo" />
                                                {rel.tag_name}
                                            </span>
                                            {isLatest && (
                                                <span className="changelog-badge">Latest</span>
                                            )}
                                        </div>
                                        <h2 className="changelog-name">
                                            {rel.name || rel.tag_name}
                                        </h2>
                                        {excerpt && (
                                            <p className="changelog-excerpt">{excerpt}</p>
                                        )}
                                    </div>
                                    <div className="changelog-right">
                                        <time>{date}</time>
                                        <div className="changelog-meta-row">
                                            {hasPlatform(rel, ".exe") && (
                                                <span className="changelog-platform"><FaWindows /></span>
                                            )}
                                            {hasPlatform(rel, ".dmg") && (
                                                <span className="changelog-platform"><FaApple /></span>
                                            )}
                                            {(hasPlatform(rel, ".AppImage") || hasPlatform(rel, ".deb") || hasPlatform(rel, ".rpm")) && (
                                                <span className="changelog-platform"><FaLinux /></span>
                                            )}
                                            {dls > 0 && (
                                                <span className="changelog-dls">
                                                    <FiDownload /> {dls.toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                        <FiChevronRight className="changelog-arrow" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
