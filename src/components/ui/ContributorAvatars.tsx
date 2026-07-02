import { useContributors } from "../../hooks/useContributors";

const REPO_URL = "https://github.com/AMVerge-team/AMVerge";

type Props = {
    limit?: number;
    className?: string;
};

// Compact overlapping avatar row used in the hero and footer.
export default function ContributorAvatars({ limit = 6, className = "" }: Props) {
    const list = useContributors();

    // loaded but empty/failed -> render nothing
    if (list && list.length === 0) return null;

    const shown = list?.slice(0, limit) ?? [];
    const extra = (list?.length ?? 0) - shown.length;

    return (
        <a
            className={`contrib-avatars ${className}`}
            href={`${REPO_URL}/graphs/contributors`}
            target="_blank"
            rel="noopener noreferrer"
            title="Contributors on GitHub"
        >
            <span className="contrib-avatars-row">
                {list === null
                    ? Array.from({ length: limit }).map((_, i) => (
                          <span key={i} className="ca-dot skeleton" />
                      ))
                    : shown.map((c) => (
                          <img
                              key={c.login}
                              className="ca-dot"
                              src={c.avatar_url}
                              alt={c.login}
                              loading="lazy"
                          />
                      ))}
            </span>
            {extra > 0 && <span className="ca-more">+{extra}</span>}
        </a>
    );
}
