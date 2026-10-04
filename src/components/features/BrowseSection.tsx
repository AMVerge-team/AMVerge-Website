import { FiVideo } from "react-icons/fi";
import browseContent from "../../content/features/browse.yaml";

export default function BrowseSection() {
    return (
        <section className="feat-section feat-alt">
            <div className="feat-visual">
                <div className="feat-video-placeholder">
                    <FiVideo />
                    <span>{browseContent.placeholderLabel}</span>
                </div>
            </div>
            <div className="feat-text">
                <span className="section-eyebrow">{browseContent.eyebrow}</span>
                <h2>
                    {browseContent.titleLine1}<br />
                    <span>{browseContent.titleLine2}</span>
                </h2>
                <p>
                    {browseContent.description}
                </p>
                <div className="feat-stats">
                    {browseContent.stats?.map((stat: { value: string; label: string }, idx: number) => (
                        <div key={idx}>
                            <span>{stat.value}</span> {stat.label}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

