import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiDownload, FiMenu, FiX } from "react-icons/fi";
import { downloadLatestExe } from "../../utils/download";

const pages = [
    { to: "/", label: "Home", end: true },
    { to: "/features", label: "Features" },
    { to: "/faq", label: "FAQ" },
    { to: "/changelog", label: "Changelog" },
    { to: "/donate", label: "Donate" },
    { to: "/docs", label: "Docs" },
];

export default function Navbar() {
    const location = useLocation();
    const onHome = location.pathname === "/";

    const [scrolled, setScrolled] = useState(false);
    const [hue, setHue] = useState(() => {
    const cached = localStorage.getItem("accent-hue");
    return cached ? Number(cached) : 120;
});
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (!onHome) {
            setScrolled(true);
            return;
        }
        const onScroll = () => setScrolled(window.scrollY > 50);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [onHome]);

    useEffect(() => {
        document.documentElement.style.setProperty(
            "--accent",
            `hsl(${hue}, 100%, 50%)`,
        );
        localStorage.setItem("accent-hue", String(hue));
    }, [hue]);

    // close mobile menu on route change
    useEffect(() => setMenuOpen(false), [location.pathname]);

    const accentColor = `hsl(${hue}, 100%, 50%)`;

    const slider = (
        <div className="color-slider-wrapper">
            <input
                type="range"
                min="0"
                max="360"
                value={hue}
                onChange={(e) => setHue(Number(e.target.value))}
                className="color-slider"
                style={{ accentColor }}
                aria-label="Accent color"
            />
        </div>
    );

    const links = pages.map(({ to, label, end }) => (
        <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
                isActive ? "nav-page nav-active" : "nav-page"
            }
        >
            {label}
        </NavLink>
    ));

    return (
        <nav className={`site-nav ${scrolled || menuOpen ? "nav-scrolled" : ""}`}>
            <div className="nav-content">
                <div className="nav-brand">
                    <NavLink to="/" end className="nav-logo">
                        <span>AMV</span>erge
                    </NavLink>
                </div>

                <div className="nav-links">{links}</div>

                <div className="nav-right">
                    <div className="nav-actions">
                        {slider}
                        <button className="nav-download" onClick={downloadLatestExe}>
                            <FiDownload /> Download
                        </button>
                    </div>
                    <button
                        className="nav-toggle"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="nav-mobile">
                    <div className="nav-mobile-links">{links}</div>
                    <div className="nav-mobile-actions">
                        {slider}
                        <button className="nav-download" onClick={downloadLatestExe}>
                            <FiDownload /> Download
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}
