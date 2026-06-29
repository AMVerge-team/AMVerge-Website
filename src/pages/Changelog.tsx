import { useEffect, useState } from "react";

type Release = {
    id: number;
    name: string | null;
    tag_name: string;
    published_at: string;
    body: string | null;
    html_url: string;
};

export default function Changelog() {
    const [releases, setReleases] = useState<Release[] | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch("https://api.github.com/repos/crptk/AMVerge/releases")
            .then((r) => {
                if (!r.ok) throw new Error(`GitHub API ${r.status}`);
                return r.json();
            })
            .then((data: Release[]) => setReleases(data))
            .catch(() => setError(true));
    }, []);

    return (
        <div className="page page-changelog">
            <header className="page-header">
                <h1><span>Changelog</span></h1>
                <p>Release history, pulled live from GitHub.</p>
            </header>

            {error && (
                <p className="page-muted">
                    Could not load releases right now. See them on{" "}
                    <a href="https://github.com/crptk/AMVerge/releases" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>.
                </p>
            )}

            {!error && releases === null && <p className="page-muted">Loading releases...</p>}

            {!error && releases?.length === 0 && (
                <p className="page-muted">No releases published yet.</p>
            )}

            <div className="changelog-list">
                {releases?.map((rel) => (
                    <article className="changelog-entry" key={rel.id}>
                        <div className="changelog-head">
                            <h2>{rel.name || rel.tag_name}</h2>
                            <span className="changelog-tag">{rel.tag_name}</span>
                            <time>
                                {new Date(rel.published_at).toLocaleDateString(undefined, {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </time>
                        </div>
                        {rel.body && <pre className="changelog-body">{rel.body.trim()}</pre>}
                        <a className="changelog-link" href={rel.html_url} target="_blank" rel="noopener noreferrer">
                            View on GitHub
                        </a>
                    </article>
                ))}
            </div>
        </div>
    );
}
