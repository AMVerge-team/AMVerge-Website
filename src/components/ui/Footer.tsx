import { Link } from "react-router-dom";
import { FiGithub, FiDownload, FiCoffee } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import { downloadLatestExe } from "../../utils/download";
import ContributorAvatars from "./ContributorAvatars";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-top">
                <div className="footer-brandcol">
                    <Link to="/" className="footer-brand">
                        <span>AMV</span>erge
                    </Link>
                    <p className="footer-tagline">
                        Scene selection made easy. Built for the AMV community,
                        by editors, for editors.
                    </p>
                    <button className="footer-download" onClick={downloadLatestExe}>
                        <FiDownload /> Download
                    </button>
                </div>

                <div className="footer-col">
                    <h4>Product</h4>
                    <Link to="/features">Features</Link>
                    <Link to="/changelog">Changelog</Link>
                </div>

                <div className="footer-col">
                    <h4>Resources</h4>
                    <Link to="/docs">Docs</Link>
                    <Link to="/faq">FAQ</Link>
                </div>

                <div className="footer-col">
                    <h4>Community</h4>
                    <a
                        href="https://github.com/AMVerge-team/AMVerge"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FiGithub /> GitHub
                    </a>
                    <a
                        href="https://discord.com/invite/bmXjTgsAaN"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaDiscord /> Discord
                    </a>
                    <Link to="/donate">
                        <FiCoffee /> Donate
                    </Link>
                </div>

                <div className="footer-col footer-contrib-col">
                    <h4>Contributors</h4>
                    <ContributorAvatars limit={6} />
                </div>
            </div>

            <div className="footer-bottom">
                <span>© {new Date().getFullYear()} AMVerge</span>
                <span>Not affiliated with any anime studio.</span>
            </div>
        </footer>
    );
}
