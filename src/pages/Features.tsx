import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import { FEATURE_SECTIONS } from "../components/features/featureList";
import useSEO from "../hooks/useSEO";
import "../css/features.css";

export default function Features() {
    useSEO({
        title: "Features",
        description: "Every AMVerge feature in one list: scene detection, clip browsing, Scene Scout search, Scenepacks, export options and more.",
    });

    const [activeId, setActiveId] = useState(FEATURE_SECTIONS[0].id);

    // the section list follows whichever section sits in the upper part of the screen
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.find((entry) => entry.isIntersecting);
                if (visible) setActiveId(visible.target.id);
            },
            { rootMargin: "-20% 0px -70% 0px" },
        );
        FEATURE_SECTIONS.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <div className="page page-features">
            <header className="feat-head">
                <h1 className="page-title">Features</h1>
                <p>Everything AMVerge can do.</p>
            </header>

            <div className="feat-layout">
                <nav className="feat-nav" aria-label="Feature sections">
                    {FEATURE_SECTIONS.map(({ id, title }) => (
                        <a key={id} href={`#${id}`} className={activeId === id ? "active" : undefined}>
                            {title}
                        </a>
                    ))}
                </nav>

                <div className="feat-content">
                    {FEATURE_SECTIONS.map(({ id, title, summary, demo, features }) => (
                        <section key={id} id={id} className="feat-group">
                            <h2>{title}</h2>
                            <p className="feat-summary">{summary}</p>

                            {demo && (
                                <div className="feat-media" style={{ aspectRatio: demo.aspectRatio }}>
                                    <img src={demo.src} alt={demo.alt} loading="lazy" />
                                </div>
                            )}

                            <dl className="feat-rows">
                                {features.map(({ name, description }) => (
                                    <div key={name} className="feat-row">
                                        <dt>{name}</dt>
                                        <dd>{description}</dd>
                                    </div>
                                ))}
                            </dl>
                        </section>
                    ))}

                    <div className="feat-next">
                        <a className="feat-download-btn" href="/#download">
                            <FiDownload /> Download AMVerge
                        </a>
                        <Link to="/docs">Read the docs</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
