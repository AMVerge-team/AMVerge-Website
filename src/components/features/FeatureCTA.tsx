import { FiSend } from "react-icons/fi";

export default function FeatureCTA() {
    return (
        <div className="feat-cta">
            <span className="section-eyebrow">Ready to try it?</span>
            <h2>
                Stop <span className="cta-strike">Scrubbing.</span>
                <br />
                Start <span className="cta-accent">Selecting.</span>
            </h2>
            <a className="feat-download-btn" href="/#download">
                <FiSend /> Download AMVerge
            </a>
        </div>
    );
}
