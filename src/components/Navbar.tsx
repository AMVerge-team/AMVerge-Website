import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "explanation", label: "Why AMVerge" },
    { id: "merge-section", label: "Merge Feature" },
    { id: "download", label: "Download" },
];

const pages = [
    { to: "/features", label: "Features" },
    { to: "/changelog", label: "Changelog" },
    { to: "/faq", label: "FAQ" },
    { to: "/gallery", label: "Gallery" },
    { to: "/docs", label: "Docs" },
];

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const onHome = location.pathname === "/";

    const [active, setActive] = useState("home");
    const [scrolled, setScrolled] = useState(false);
    const [hue, setHue] = useState(120); // lime = 120

    useEffect(() => {
        if (!onHome) {
            setScrolled(true);
            return;
        }
        const onScroll = () => {
            setScrolled(window.scrollY > 50);

            const offsets = sections.map(({ id }) => {
                const el = document.getElementById(id);
                return { id, top: el ? el.getBoundingClientRect().top : Infinity };
            });

            const current = offsets.reduce((closest, s) =>
                Math.abs(s.top) < Math.abs(closest.top) ? s : closest
            );
            setActive(current.id);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [onHome]);

    useEffect(() => {
        document.documentElement.style.setProperty("--accent", `hsl(${hue}, 100%, 50%)`);
    }, [hue]);

    const goSection = (id: string) => {
        if (onHome) {
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        } else {
            navigate(`/#${id}`);
        }
    };

    const accentColor = `hsl(${hue}, 100%, 50%)`;

    return (
        <nav className={`site-nav ${scrolled ? "nav-scrolled" : ""}`}>
            <div className="nav-content">
                <span className="nav-logo" onClick={() => goSection("home")}>
                    <span>AMV</span>erge
                </span>
                <div className="color-slider-wrapper">
                    <input
                        type="range"
                        min="0"
                        max="360"
                        value={hue}
                        onChange={(e) => setHue(Number(e.target.value))}
                        className="color-slider"
                        style={{ accentColor }}
                    />
                </div>
                <div className="nav-links">
                    {sections.map(({ id, label }) => (
                        <button
                            key={id}
                            className={onHome && active === id ? "nav-active" : ""}
                            onClick={() => goSection(id)}
                        >
                            {label}
                        </button>
                    ))}
                    <span className="nav-divider" />
                    {pages.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                isActive ? "nav-page nav-active" : "nav-page"
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                </div>
            </div>
        </nav>
    );
}
