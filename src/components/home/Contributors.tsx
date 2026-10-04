import { FiGithub } from "react-icons/fi";
import { useFadeIn } from "../../hooks/useFadeIn";
import { useContributors } from "../../hooks/useContributors";
import contribContent from "../../content/home/contributors.yaml";
import { formatBrandText } from "../../utils/formatText";

const REPO_URL = "https://github.com/AMVerge-team/AMVerge";
const MAX_SHOWN = 14;

export default function Contributors() {
    const ref = useFadeIn<HTMLElement>();
    const contributors = useContributors();

    // Hide the whole band if it loaded but is empty/failed
    if (contributors && contributors.length === 0) return null;

    const shown = contributors?.slice(0, MAX_SHOWN) ?? [];
    const extra = (contributors?.length ?? 0) - shown.length;

    return (
        <section id="contributors" className="contrib-section fade-in" ref={ref}>
            <div className="section-head">
                <span className="section-eyebrow">{contribContent.eyebrow}</span>
                <h2 className="contrib-title">
                    {formatBrandText(contribContent.titlePrefix)} <span className="cta-accent">{contribContent.titleAccent}</span>
                </h2>
            </div>
            <p className="contrib-sub">
                {formatBrandText(contribContent.subtitle)}
            </p>

            <div className="contrib-grid">
                {contributors === null
                    ? Array.from({ length: MAX_SHOWN }).map((_, i) => (
                          <span key={i} className="contrib-avatar skeleton" />
                      ))
                    : shown.map((c) => (
                          <a
                              key={c.login}
                              className="contrib-avatar"
                              href={c.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              title={`${c.login} · ${c.contributions} commits`}
                          >
                              <img src={c.avatar_url} alt={c.login} loading="lazy" />
                              <span className="contrib-name">{c.login}</span>
                          </a>
                      ))}
            </div>

            {extra > 0 && (
                <p className="contrib-more">+ {extra} {contribContent.moreSuffix}</p>
            )}

            <a
                className="contrib-cta"
                href={`${REPO_URL}/graphs/contributors`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <FiGithub /> {contribContent.ctaLabel}
            </a>
        </section>
    );
}

