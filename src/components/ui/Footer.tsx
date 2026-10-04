import { Link } from "react-router-dom";
import { FiGithub, FiDownload, FiCoffee } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import { downloadLatestExe } from "../../utils/download";
import ContributorAvatars from "./ContributorAvatars";
import footerContent from "../../content/layout/footer.yaml";
import { formatBrandText } from "../../utils/formatText";

interface FooterLink {
    to: string;
    label: string;
}

export default function Footer() {
    const { sections } = footerContent;

    return (
        <footer className="site-footer">
            <div className="footer-top">
                <div className="footer-brandcol">
                    <Link to="/" className="footer-brand">
                        <span>AMV</span>erge
                    </Link>
                    <p className="footer-tagline">
                        {formatBrandText(footerContent.tagline)}
                    </p>
                    <button className="footer-download" onClick={downloadLatestExe}>
                        <FiDownload /> {footerContent.downloadBtn}
                    </button>
                </div>

                <div className="footer-col">
                    <h4>{sections.product.title}</h4>
                    {sections.product.links?.map((link: FooterLink) => (
                        <Link key={link.to} to={link.to}>{link.label}</Link>
                    ))}
                </div>

                <div className="footer-col">
                    <h4>{sections.resources.title}</h4>
                    {sections.resources.links?.map((link: FooterLink) => (
                        <Link key={link.to} to={link.to}>{link.label}</Link>
                    ))}
                </div>

                <div className="footer-col">
                    <h4>{sections.community.title}</h4>
                    <a
                        href={sections.community.github.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FiGithub /> {sections.community.github.label}
                    </a>
                    <a
                        href={sections.community.discord.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaDiscord /> {sections.community.discord.label}
                    </a>
                    <Link to={sections.community.donate.to}>
                        <FiCoffee /> {sections.community.donate.label}
                    </Link>
                </div>

                <div className="footer-col footer-contrib-col">
                    <h4>{sections.contributors.title}</h4>
                    <ContributorAvatars limit={6} />
                </div>
            </div>

            <div className="footer-bottom">
                <span>© {new Date().getFullYear()} AMVerge</span>
                <span>{footerContent.disclaimer}</span>
            </div>
        </footer>
    );
}

