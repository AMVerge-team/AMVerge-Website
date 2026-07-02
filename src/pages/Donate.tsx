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
                Don't feel obligated to donate at all, I'm just throwing it out for the
                people who've been asking. The software will always be free. I'll add an
                option on the app as well as the website.
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

            <p className="donate-thanks">
                Thank you for supporting open source.
            </p>
        </div>
    );
}
