import { FiVideo } from "react-icons/fi";
import detectContent from "../../content/features/detect.yaml";
import { formatBrandText } from "../../utils/formatText";

export default function DetectSection() {
    return (
        <section className="feat-section">
            <div className="feat-text">
                <span className="section-eyebrow">{detectContent.eyebrow}</span>
                <h2>
                    {detectContent.titleLine1}<br />
                    <span>{detectContent.titleLine2}</span>
                </h2>
                <p>
                    {formatBrandText(detectContent.description)}
                </p>
                <div className="feat-stats">
                    {detectContent.stats?.map((stat: { value: string; label: string }, idx: number) => (
                        <div key={idx}>
                            <span>{stat.value}</span> {stat.label}
                        </div>
                    ))}
                </div>
            </div>
            <div className="feat-visual">
                <div className="feat-video-placeholder">
                    <FiVideo />
                    <span>{detectContent.placeholderLabel}</span>
                </div>
            </div>
        </section>
    );
}

