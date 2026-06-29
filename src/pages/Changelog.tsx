import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchReleases } from "../services/github";
import type { GithubRelease } from "../services/github";

export default function Changelog() {
    const [releases, setReleases] = useState<GithubRelease[] | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchReleases()
            .then((data) => setReleases(data))
            .catch(() => setError(true));
    }, []);

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
                        const date = new Date(rel.published_at).toLocaleDateString(
                            undefined,
                            { year: "numeric", month: "short", day: "numeric" },
                        );
                        const isLatest = i === 0;

                        return (
                            <Link
                                to={`/changelog/${rel.tag_name}`}
                                className={`changelog-entry ${isLatest ? "changelog-latest" : ""}`}
                                key={rel.id}
                            >
                                <div className="changelog-head">
                                    <span className="changelog-tag">{rel.tag_name}</span>
                                    {isLatest && (
                                        <span className="changelog-badge">Latest</span>
                                    )}
                                    <time>{date}</time>
                                </div>
                                <h2 className="changelog-name">
                                    {rel.name || rel.tag_name}
                                </h2>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
