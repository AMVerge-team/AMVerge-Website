import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiFileText, FiHelpCircle, FiDownload, FiCoffee, FiClock } from "react-icons/fi";
import useSEO from "../hooks/useSEO";
import notFoundContent from "../content/notFound/notFound.yaml";
import { formatBrandText } from "../utils/formatText";

const iconMap: Record<string, React.ReactNode> = {
    home: <FiHome />,
    download: <FiDownload />,
    docs: <FiFileText />,
    faq: <FiHelpCircle />,
    changelog: <FiClock />,
    donate: <FiCoffee />,
};

interface NotFoundLink {
    to: string;
    icon: string;
    title: string;
    description: string;
}

export default function NotFound() {
    useSEO({
        title: notFoundContent.seo.title,
    });

    return (
        <div className="page page-notfound">
            <div className="section-head">
                <span className="section-eyebrow">{notFoundContent.header.eyebrow}</span>
                <h1 className="page-title" style={{ fontSize: "clamp(80px, 12vw, 140px)", lineHeight: 1 }}>
                    <span>{notFoundContent.header.title}</span>
                </h1>
            </div>

            <p className="page-sub">
                {formatBrandText(notFoundContent.header.subtitle)}
            </p>

            <div className="notfound-links fade-in-children">
                {notFoundContent.links?.map((link: NotFoundLink) => (
                    <Link to={link.to} className="feature-card" key={link.to}>
                        <div className="feature-icon">{iconMap[link.icon] || <FiHome />}</div>
                        <h2>{link.title}</h2>
                        <p>{link.description}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

