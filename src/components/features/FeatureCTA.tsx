import { FiSend } from "react-icons/fi";
import ctaContent from "../../content/features/cta.yaml";
import { formatBrandText } from "../../utils/formatText";

export default function FeatureCTA() {
    return (
        <div className="feat-cta">
            <span className="section-eyebrow">{ctaContent.eyebrow}</span>
            <h2>
                {ctaContent.titlePrefix} <span className="cta-strike">{ctaContent.titleStrike}</span>
                <br />
                {ctaContent.titleMiddle} <span className="cta-accent">{ctaContent.titleAccent}</span>
            </h2>
            <a className="feat-download-btn" href="/#download">
                <FiSend /> {formatBrandText(ctaContent.downloadBtn)}
            </a>
        </div>
    );
}

