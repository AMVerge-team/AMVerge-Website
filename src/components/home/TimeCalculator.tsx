import { useState } from "react";
import { FiClock, FiZap, FiSliders, FiCheckCircle } from "react-icons/fi";
import calcContent from "../../content/home/calculator.yaml";
import { formatBrandText } from "../../utils/formatText";

interface Preset {
    id: string;
    name: string;
    eps: number;
    tag: string;
}

export default function TimeCalculator() {
    const [episodes, setEpisodes] = useState<number>(4);

    // Realistic AMV editor metrics:
    // Manual in AE: ~3.5 hrs per 24min episode (scrubbing, split shortcuts, nesting, subclip naming)
    // AMVerge: ~1.5 min per episode (hardware-accelerated PySceneDetect I-frame scanner)
    const manualHours = episodes * 3.5;
    const amvergeMinutes = episodes * 1.5;
    const savedHours = Math.floor(manualHours - amvergeMinutes / 60);
    const savedMinutes = Math.round((manualHours - amvergeMinutes / 60 - savedHours) * 60);
    const amvsCount = Math.max(1, Math.round((manualHours - amvergeMinutes / 60) / 10));

    // Approximate scene cuts count (~420 cuts per standard episode)
    const totalScenes = episodes * 420;

    return (
        <div className="time-calc-container">
            {/* Header */}
            <div className="time-calc-header">
                <span className="section-eyebrow">
                    <FiSliders style={{ marginRight: 6, verticalAlign: "middle" }} />
                    {calcContent.eyebrow}
                </span>
                <h3 className="time-calc-title">{calcContent.title}</h3>
            </div>

            {/* Presets & Slider */}
            <div className="time-calc-controls">
                <div className="time-calc-presets-row">
                    <span className="presets-title">{calcContent.episodesLabel}:</span>
                    <div className="presets-pill-group">
                        {calcContent.projectPresets?.map((p: Preset) => (
                            <button
                                key={p.id}
                                type="button"
                                className={`preset-pill ${episodes === p.eps ? "active" : ""}`}
                                onClick={() => setEpisodes(p.eps)}
                            >
                                <span className="preset-name">{p.name}</span>
                                <span className="preset-tag">{p.tag}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="time-calc-slider-box">
                    <div className="time-calc-slider-header">
                        <span className="time-calc-slider-label">Custom Episode Count</span>
                        <span className="time-calc-slider-value">
                            {episodes} <span>{calcContent.episodesUnit}</span>
                            <span className="scenes-estimate">~{totalScenes.toLocaleString()} scenes</span>
                        </span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="24"
                        step="1"
                        value={episodes}
                        onChange={(e) => setEpisodes(Number(e.target.value))}
                        className="time-calc-slider"
                        aria-label="Episodes slider"
                    />
                    <div className="time-calc-slider-ticks">
                        <span>1 ep</span>
                        <span>6 eps</span>
                        <span>12 eps (1 cour)</span>
                        <span>18 eps</span>
                        <span>24 eps (2 cours)</span>
                    </div>
                </div>
            </div>

            {/* Interactive Dual Timeline Visualizer */}
            <div className="calc-timeline-board">
                {/* Track 1: After Effects Manual Timeline */}
                <div className="calc-track-row track-ae">
                    <div className="calc-track-meta">
                        <div className="track-badge badge-ae">
                            <FiClock /> {calcContent.manualTag}
                        </div>
                        <span className="track-title">{calcContent.timelineManualLabel}</span>
                        <span className="track-time-cost">{manualHours.toFixed(1)} hrs</span>
                    </div>
                    <div className="calc-track-bar-container">
                        <div className="calc-track-bar bar-ae">
                            <div className="bar-glitch-lines" />
                            <div className="bar-label-inner">Scrubbing · Keyframing · Split · Render · Sort</div>
                        </div>
                    </div>
                </div>

                {/* Track 2: AMVerge Automated Timeline */}
                <div className="calc-track-row track-amverge">
                    <div className="calc-track-meta">
                        <div className="track-badge badge-amverge">
                            <FiZap /> {calcContent.amvergeTag}
                        </div>
                        <span className="track-title">{formatBrandText(calcContent.timelineAmvergeLabel)}</span>
                        <span className="track-time-cost track-highlight">
                            {amvergeMinutes < 60 ? `${amvergeMinutes.toFixed(0)} min` : `${(amvergeMinutes / 60).toFixed(1)} hrs`}
                        </span>
                    </div>
                    <div className="calc-track-bar-container">
                        <div
                            className="calc-track-bar bar-amverge"
                            style={{
                                width: `${Math.max(4, Math.min(100, (amvergeMinutes / (manualHours * 60)) * 100 * 8))}%`
                            }}
                        >
                            <div className="bar-label-inner">
                                {amvergeMinutes < 60 ? `${amvergeMinutes.toFixed(0)}m` : `${(amvergeMinutes / 60).toFixed(1)}h`}
                            </div>
                        </div>
                        <div className="bar-remainder">
                            <span className="remainder-text">
                                +{savedHours}h {savedMinutes > 0 ? `${savedMinutes}m` : ""} saved (99.3% faster)
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Summary Bar & NLE Export Badges */}
            <div className="calc-summary-footer">
                <div className="calc-summary-stat">
                    <span className="summary-label">{calcContent.equivalentLabel}</span>
                    <span className="summary-value">
                        +{savedHours}h {savedMinutes > 0 ? `${savedMinutes}m` : ""}
                        <span className="summary-sub">
                            (~{amvsCount} {calcContent.equivalentUnit})
                        </span>
                    </span>
                </div>

                <div className="calc-nle-presets">
                    <span className="nle-label">{calcContent.exportPresetLabel}</span>
                    <div className="nle-badges">
                        {calcContent.exportPresets?.map((fmt: string, idx: number) => (
                            <span key={idx} className="nle-badge">
                                <FiCheckCircle /> {fmt}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
