import { FiVideo } from "react-icons/fi";
import mergeContent from "../../content/features/merge.yaml";
import { formatBrandText } from "../../utils/formatText";

export default function MergeFeatureSection() {
    return (
        <section className="feat-section">
            <div className="feat-text">
                <span className="section-eyebrow">{mergeContent.eyebrow}</span>
                <h2>
                    {mergeContent.titleLine1}<br />
                    <span>{mergeContent.titleLine2}</span>
                </h2>
                <p>
                    {formatBrandText(mergeContent.description)}
                </p>
                <div className="feat-stats">
                    {mergeContent.stats?.map((stat: { value: string; label: string }, idx: number) => (
                        <div key={idx}>
                            <span>{stat.value}</span> {stat.label}
                        </div>
                    ))}
                </div>
            </div>
            <div className="feat-visual">
                <div className="feat-video-placeholder">
                    <FiVideo />
                    <span>{mergeContent.placeholderLabel}</span>
                </div>
            </div>
        </section>
    );
}

