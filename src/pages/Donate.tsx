import React from "react";
import { FiCoffee, FiExternalLink, FiHeart, FiServer, FiStar, FiShare2, FiCode, FiSmile } from "react-icons/fi";
import useSEO from "../hooks/useSEO";
import donateContent from "../content/donate/donate.yaml";
import { formatBrandText } from "../utils/formatText";

const iconMap: Record<string, React.ReactNode> = {
    heart: <FiHeart />,
    server: <FiServer />,
    star: <FiStar />,
    share: <FiShare2 />,
    code: <FiCode />,
    smile: <FiSmile />,
};

interface DonateCard {
    id: string;
    icon: string;
    title: string;
    text: string;
}

export default function Donate() {
    useSEO({
        title: donateContent.seo.title,
        description: donateContent.seo.description,
    });
    return (
        <div className="page page-donate">
            <div className="section-head">
                <span className="section-eyebrow">{donateContent.header.eyebrow}</span>
                <h1 className="page-title">
                    {donateContent.header.titlePrefix} <span>{donateContent.header.titleAccent}</span>
                </h1>
            </div>

            <p className="page-sub">
                {formatBrandText(donateContent.header.subtitle)}
            </p>

            <div className="donate-grid fade-in-children">
                {donateContent.cards.map((card: DonateCard) => (
                    <div className="feature-card" key={card.id}>
                        <div className="feature-icon">
                            {iconMap[card.icon] || <FiHeart />}
                        </div>
                        <h2>{card.title}</h2>
                        <p>{formatBrandText(card.text)}</p>
                    </div>
                ))}
            </div>

            <div className="donate-cta-card">
                <FiCoffee className="donate-cta-icon" />
                <h3>{donateContent.cta.title}</h3>
                <p>
                    {formatBrandText(donateContent.cta.text)}
                </p>
                <a
                    href={donateContent.cta.buttonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="donate-btn"
                >
                    <FiCoffee />
                    {donateContent.cta.buttonText}
                    <FiExternalLink className="donate-btn-ext" />
                </a>
            </div>

            <p className="donate-thanks">
                {donateContent.thanks}
            </p>
        </div>
    );
}

