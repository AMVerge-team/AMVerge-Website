import { FiCoffee, FiExternalLink } from "react-icons/fi";

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

            <div className="donate-content">
                <div className="donate-section">
                    <h3>No obligation, ever</h3>
                    <p>
                        You do not need to donate to use AMVerge. You do not need to donate
                        to request features, report bugs, or join the community. The download
                        button will never ask for your wallet before giving you the installer.
                        This page exists only because some people asked for a way to say thanks.
                    </p>
                </div>

                <div className="donate-section">
                    <h3>Where your support goes</h3>
                    <p>
                        Every contribution goes directly toward keeping the project alive:
                        domain costs, hosting the download counter and docs backend, and
                        the endless supply of caffeine that powers late-night debugging
                        sessions. No corporate sponsor, no ads, no data selling, just a
                        solo developer and a community that values free tools.
                    </p>
                </div>

                <div className="donate-section">
                    <h3>What you get in return</h3>
                    <p>
                        The same thing you already have: a free, open-source scene selection
                        tool that respects your time and your wallet. Updates keep rolling
                        out regardless of donations. Your name might show up in the
                        contributors section of the repo if you want, but honestly the best
                        way to support the project is using it, sharing it, and telling
                        other editors about it.
                    </p>
                </div>

                <div className="donate-section">
                    <h3>Other ways to help</h3>
                    <p>
                        Not in a position to donate? No problem at all. Star the repo on
                        GitHub, share AMVerge with your editing friends, report bugs when
                        you find them, or contribute code if you're into that. Word of
                        mouth and honest feedback are just as valuable as any donation.
                    </p>
                </div>
            </div>

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

            <p className="donate-thanks">
                Thank you for being part of the community.
            </p>
        </div>
    );
}
