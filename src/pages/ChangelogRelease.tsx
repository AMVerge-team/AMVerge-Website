import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    FiDownload,
    FiExternalLink,
    FiArrowLeft,
    FiHardDrive,
} from "react-icons/fi";
import { FaWindows, FaApple } from "react-icons/fa";
import { fetchReleaseByTag } from "../services/github";
import type { GithubRelease, GithubAsset } from "../services/github";

function getDownloads(rel: GithubRelease) {
    const list = (rel.assets ?? []).filter(
        (a) => !a.name.endsWith(".sig") && !a.name.endsWith("latest.json"),
    );
    return list.sort((a, b) => {
        const pa = a.name.endsWith(".exe") ? 0 : a.name.endsWith(".dmg") ? 1 : 2;
        const pb = b.name.endsWith(".exe") ? 0 : b.name.endsWith(".dmg") ? 1 : 2;
        return pa - pb;
    });
}

function formatSize(bytes: number) {
    if (bytes >= 1_000_000_000) return `${(bytes / 1_000_000_000).toFixed(1)} GB`;
    if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
    return `${(bytes / 1_000).toFixed(1)} KB`;
}

function DownloadCard({ asset }: { asset: GithubAsset }) {
    const isWindows = asset.name.endsWith(".exe");
    const isMacApp = asset.name.endsWith(".dmg");
    const isMacTar = asset.name.includes("-x86_64");
    const isMacArm = asset.name.includes("-aarch64");

    let icon = <FiHardDrive />;
    let label = "Download";
    if (isWindows) { icon = <FaWindows />; label = "Windows"; }
    else if (isMacApp) { icon = <FaApple />; label = "macOS"; }
    else if (isMacTar) { icon = <FaApple />; label = "macOS Intel"; }
    else if (isMacArm) { icon = <FaApple />; label = "macOS ARM"; }

    return (
        <a
            className="release-dl-card"
            href={asset.browser_download_url}
            target="_blank"
            rel="noopener noreferrer"
        >
            <span className="release-dl-icon">{icon}</span>
            <div className="release-dl-info">
                <span className="release-dl-label">{label}</span>
                <span className="release-dl-size">
                    {formatSize(asset.size)} · {asset.download_count} downloads
                </span>
            </div>
            <FiDownload />
        </a>
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

    if (error || (!release && tag)) {
        return (
            <div className="page">
                <Link to="/changelog" className="changelog-back">
                    <FiArrowLeft /> Changelog
                </Link>
                <p className="page-muted">
                    {error ? "Release not found." : "Loading..."}
                </p>
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

    const downloads = getDownloads(release);
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
                <h1 className="release-title">
                    {release.name || release.tag_name}
                </h1>
            </div>

            {release.body && (
                <div className="release-body-section">
                    <h2 className="release-section-title">Release Notes</h2>
                    <pre className="release-body">{release.body.trim()}</pre>
                </div>
            )}

            {downloads.length > 0 && (
                <div className="release-body-section">
                    <h2 className="release-section-title">Downloads</h2>
                    <div className="release-downloads">
                        {downloads.map((asset) => (
                            <DownloadCard key={asset.id} asset={asset} />
                        ))}
                    </div>
                </div>
            )}

            <div className="release-footer">
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
