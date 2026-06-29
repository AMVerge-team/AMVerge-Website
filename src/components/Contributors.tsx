import { FiGithub } from "react-icons/fi";
import { useFadeIn } from "../hooks/useFadeIn";
import { useContributors } from "../hooks/useContributors";

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
                <span className="section-eyebrow">Thank you</span>
                <h2 className="contrib-title">
                    AMVerge wouldn't exist <span className="cta-accent">without you</span>
                </h2>
            </div>
            <p className="contrib-sub">
                Every fix, feature, and idea comes from people giving their own
                time to make AMVerge better. To everyone below: thank you.
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
                <p className="contrib-more">+ {extra} more contributors</p>
            )}

            <a
                className="contrib-cta"
                href={`${REPO_URL}/graphs/contributors`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <FiGithub /> Contribute on GitHub
            </a>
        </section>
    );
}
