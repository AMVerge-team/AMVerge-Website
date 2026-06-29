import DetectSection from "../components/features/DetectSection";
import BrowseSection from "../components/features/BrowseSection";
import MergeFeatureSection from "../components/features/MergeFeatureSection";
import ExportSection from "../components/features/ExportSection";
import FeatureCTA from "../components/features/FeatureCTA";

export default function Features() {
    return (
        <div className="page page-features">
            <div className="section-head">
                <span className="section-eyebrow">What it does</span>
                <h1 className="page-title">
                    Built for <span>Editors</span>
                </h1>
            </div>
            <p className="page-sub">
                Every tool you need to go from raw footage to final export, without
                opening a timeline until you're ready.
            </p>

            <DetectSection />
            <BrowseSection />
            <MergeFeatureSection />
            <ExportSection />
            <FeatureCTA />
        </div>
    );
}
