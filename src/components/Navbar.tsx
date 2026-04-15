import { useState, useEffect } from "react";

const sections = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "explanation", label: "Why AMVerge" },
    { id: "download", label: "Download" },
];

export default function Navbar() {
    const [active, setActive] = useState("home");
    const [scrolled, setScrolled] = useState(false);
    const [hue, setHue] = useState(120); // lime = 120

    useEffect(() => {
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

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.documentElement.style.setProperty("--accent", `hsl(${hue}, 100%, 50%)`);
    }, [hue]);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const accentColor = `hsl(${hue}, 100%, 50%)`;

    return (
        <nav className={`site-nav ${scrolled ? "nav-scrolled" : ""}`}>
            <div className="nav-content">
                <span className="nav-logo" onClick={() => scrollTo("home")}>
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
                            className={active === id ? "nav-active" : ""}
                            onClick={() => scrollTo(id)}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}
