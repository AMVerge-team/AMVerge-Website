import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiDownload, FiExternalLink, FiArrowLeft } from "react-icons/fi";
import { fetchReleaseByTag } from "../services/github";
import type { GithubRelease } from "../services/github";

function getExeAsset(rel: GithubRelease) {
    return rel.assets?.find(
        (a) => a.name.endsWith(".exe") && !a.name.endsWith(".sig"),
    );
}

export default function ChangelogRelease() {
    const { tag } = useParams<{ tag: string }>();
    const [release, setRelease] = useState<GithubRelease | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!tag) return;
        fetchReleaseByTag(tag)
            .then(setRelease)
            .catch(() => setError(true));
    }, [tag]);

    if (error) {
        return (
            <div className="page">
                <p className="page-muted">Release not found.</p>
                <Link to="/changelog" className="changelog-back">
                    <FiArrowLeft /> Back to changelog
                </Link>
            </div>
        );
    }

    if (!release) {
        return (
            <div className="page">
                <p className="page-muted">Loading...</p>
            </div>
        );
    }

    const exe = getExeAsset(release);
    const date = new Date(release.published_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="page page-changelog-release">
            <Link to="/changelog" className="changelog-back">
                <FiArrowLeft /> Changelog
            </Link>

            <div className="release-header">
                <div className="release-meta">
                    <span className="changelog-tag">{release.tag_name}</span>
                    <time>{date}</time>
                </div>
                <h1 className="release-title">{release.name || release.tag_name}</h1>
            </div>

            {release.body && (
                <pre className="release-body">{release.body.trim()}</pre>
            )}

            <div className="release-actions">
                {exe && (
                    <a
                        className="release-dl"
                        href={exe.browser_download_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FiDownload /> {exe.name}
                    </a>
                )}
                <a
                    className="release-gh"
                    href={release.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FiExternalLink /> View on GitHub
                </a>
            </div>
        </div>
    );
}
