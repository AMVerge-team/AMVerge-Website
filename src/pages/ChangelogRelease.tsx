import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FiDownload, FiExternalLink, FiArrowLeft } from "react-icons/fi";
import { FaWindows, FaApple } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchReleaseByTag, fetchSharedChangelogNotes } from "../services/github";
import useSEO from "../hooks/useSEO";
import { Skeleton } from "../components/ui/Skeleton";
import type { GithubRelease, GithubAsset } from "../services/github";

function getDownloads(rel: GithubRelease) {
    const list = (rel.assets ?? []).filter(
        (a) =>
            !a.name.endsWith(".sig") &&
            (a.name.endsWith(".exe") || a.name.endsWith(".dmg")),
    );
    return list.sort((a, b) => {
        const pa = a.name.endsWith(".exe") ? 0 : 1;
        const pb = b.name.endsWith(".exe") ? 0 : 1;
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
    const icon = isWindows ? <FaWindows /> : <FaApple />;
    const label = isWindows ? "Windows" : "macOS";

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
    const [sharedNotes, setSharedNotes] = useState<string | null>(null);
    const [error, setError] = useState(false);

    useSEO({
        title: release ? `Release ${release.tag_name}` : "Release",
        description: release ? `AMVerge ${release.name || release.tag_name} release notes and downloads.` : "AMVerge release details and download links.",
    });

    useEffect(() => {
        if (!tag) return;
        let cancelled = false;
        setSharedNotes(null);
        fetchReleaseByTag(tag)
            .then((rel) => {
                if (!cancelled) setRelease(rel);
            })
            .catch(() => {
                if (!cancelled) setError(true);
            });
        fetchSharedChangelogNotes(tag)
            .then((md) => {
                if (!cancelled && md) setSharedNotes(md);
            })
            .catch(() => {});
        return () => {
            cancelled = true;
        };
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
                <Link to="/changelog" className="changelog-back">
                    <FiArrowLeft /> Changelog
                </Link>
                <div className="release-fade-in">
                    <div className="release-header">
                        <Skeleton width="60%" height="48px" className="skeleton-center" />
                        <div style={{ height: 10 }} />
                        <Skeleton width="140px" height="20px" className="skeleton-center" />
                    </div>
                    <div className="release-body-section">
                        <Skeleton width="30%" height="22px" />
                        <div style={{ height: 14 }} />
                        <Skeleton height="120px" borderRadius="12px" />
                    </div>
                </div>
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

            <div className="release-fade-in">
            <div className="release-header">
                <h1 className="release-title">
                    {release.name || release.tag_name}
                </h1>
                <div className="release-meta">
                    <time>{date}</time>
                </div>
            </div>

            {(sharedNotes || release.body) && (
                <div className="release-body-section">
                    <h2 className="release-section-title">Release Notes</h2>
                    <div className="release-body release-body-markdown">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {(sharedNotes || release.body || "").trim()}
                        </ReactMarkdown>
                    </div>
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
        </div>
    );
}
