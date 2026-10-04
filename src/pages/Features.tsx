import DetectSection from "../components/features/DetectSection";
import BrowseSection from "../components/features/BrowseSection";
import MergeFeatureSection from "../components/features/MergeFeatureSection";
import ExportSection from "../components/features/ExportSection";
import FeatureCTA from "../components/features/FeatureCTA";
import useSEO from "../hooks/useSEO";
import headerContent from "../content/features/header.yaml";
import "../css/features.css";

export default function Features() {
    useSEO({
        title: headerContent.seo.title,
        description: headerContent.seo.description,
    });
    return (
        <div className="page page-features">
            <div className="section-head">
                <span className="section-eyebrow">{headerContent.eyebrow}</span>
                <h1 className="page-title">
                    {headerContent.titlePrefix} <span>{headerContent.titleAccent}</span>
                </h1>
            </div>
            <p className="page-sub">
                {headerContent.subtitle}
            </p>

            <div className="fade-in-children">
            <DetectSection />
            <BrowseSection />
            <MergeFeatureSection />
            <ExportSection />
            <FeatureCTA />
            </div>
        </div>
    );
}

