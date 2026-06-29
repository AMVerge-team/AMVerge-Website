import { Link } from "react-router-dom";
import { FiGithub } from "react-icons/fi";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-brand">
                <span>AMV</span>erge
            </div>
            <div className="footer-links">
                <Link to="/features">Features</Link>
                <Link to="/changelog">Changelog</Link>
                <Link to="/faq">FAQ</Link>
                <Link to="/gallery">Gallery</Link>
                <Link to="/docs">Docs</Link>
                <a
                    href="https://github.com/AMVerge-team/AMVerge"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FiGithub /> GitHub
                </a>
            </div>
            <div className="footer-note">
                Built for the AMV community, by editors, for editors.
            </div>
        </footer>
    );
}
