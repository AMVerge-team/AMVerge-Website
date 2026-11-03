import DetectSection from "../components/features/DetectSection";
import SceneScoutSection from "../components/features/SceneScoutSection";
import MatchCutSection from "../components/features/MatchCutSection";
import FeatureCTA from "../components/features/FeatureCTA";
import useSEO from "../hooks/useSEO";
import "../css/features.css";

export default function Features() {
    useSEO({
        title: "Features",
        description: "Automatic scene detection, Scene Scout search, and match cut finding. Everything you need to go from raw footage to final export without opening a timeline.",
    });
    return (
        <div className="page page-features">
            <div className="section-head">
                <h1 className="page-title">
                    Built for <span>Editors</span>
                </h1>
            </div>
            <p className="page-sub">
                Every tool you need to go from raw footage to final export, without
                opening a timeline until you're ready.
            </p>

            <div className="fade-in-children">
            <DetectSection />
            <SceneScoutSection />
            <MatchCutSection />
            <FeatureCTA />
            </div>
        </div>
    );
}
