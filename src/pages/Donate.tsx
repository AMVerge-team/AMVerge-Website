import { FiCoffee, FiExternalLink, FiHeart, FiServer, FiStar, FiShare2 } from "react-icons/fi";

export default function Donate() {
    return (
        <div className="page page-donate">
            <div className="section-head">
                <span className="section-eyebrow">Support the project</span>
                <h1 className="page-title">
                    Buy me a <span>coffee</span>
                </h1>
            </div>

            <p className="page-sub">
                AMVerge is and always will be free. No paywalls, no premium tiers,
                no locked features. Just a tool made for editors, by editors.
            </p>

            <div className="donate-grid">
                <div className="feature-card">
                    <div className="feature-icon"><FiHeart /></div>
                    <h2>No obligation, ever</h2>
                    <p>
                        You do not need to donate to use AMVerge. You do not need to donate
                        to request features, report bugs, or join the community. The download
                        button will never ask for your wallet before giving you the installer.
                        This page exists only because some people asked for a way to say thanks.
                    </p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon"><FiServer /></div>
                    <h2>Where your support goes</h2>
                    <p>
                        Every contribution goes directly toward keeping the project alive:
                        domain costs, hosting the download counter and docs backend, and
                        the endless supply of caffeine that powers late-night debugging
                        sessions. No corporate sponsor, no ads, no data selling.
                    </p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon"><FiStar /></div>
                    <h2>What you get in return</h2>
                    <p>
                        The same thing you already have: a free, open-source scene selection
                        tool that respects your time and your wallet. Updates keep rolling
                        out regardless of donations. The best way to support the project is
                        using it, sharing it, and telling other editors about it.
                    </p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon"><FiShare2 /></div>
                    <h2>Other ways to help</h2>
                    <p>
                        Not in a position to donate? No problem at all. Star the repo on
                        GitHub, share AMVerge with your editing friends, report bugs when
                        you find them, or contribute code if you're into that. Word of
                        mouth and honest feedback are just as valuable as any donation.
                    </p>
                </div>
            </div>

            <div className="donate-cta-card">
                <FiCoffee className="donate-cta-icon" />
                <h3>If you'd like to chip in</h3>
                <p>
                    There's zero pressure. But if AMVerge saved you hours of work and
                    you want to throw a few bucks my way, it genuinely helps keep
                    the servers running and the coffee flowing.
                </p>
                <a
                    href="https://buymeacoffee.com/crptk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="donate-btn"
                >
                    <FiCoffee />
                    Buy Me a Coffee
                    <FiExternalLink className="donate-btn-ext" />
                </a>
            </div>

            <p className="donate-thanks">
                Thank you for being part of the community.
            </p>
        </div>
    );
}
