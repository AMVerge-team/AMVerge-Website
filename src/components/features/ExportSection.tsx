import { FiVideo } from "react-icons/fi";
import exportContent from "../../content/features/export.yaml";

export default function ExportSection() {
    return (
        <section className="feat-section feat-alt">
            <div className="feat-visual">
                <div className="feat-video-placeholder">
                    <FiVideo />
                    <span>{exportContent.placeholderLabel}</span>
                </div>
            </div>
            <div className="feat-text">
                <span className="section-eyebrow">{exportContent.eyebrow}</span>
                <h2>
                    {exportContent.titleLine1}<br />
                    <span>{exportContent.titleLine2}</span>
                </h2>
                <p>
                    {exportContent.description}
                </p>
                <div className="feat-stats">
                    {exportContent.stats?.map((stat: { value: string; label: string }, idx: number) => (
                        <div key={idx}>
                            <span>{stat.value}</span> {stat.label}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

