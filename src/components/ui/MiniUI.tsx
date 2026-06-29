import { useState } from "react";
import {
    FiHome,
    FiMenu,
    FiSettings,
    FiChevronLeft,
    FiChevronDown,
    FiChevronUp,
    FiFolder,
    FiEdit2,
    FiHelpCircle,
    FiFilePlus,
} from "react-icons/fi";
import { FaDiscord, FaWindows, FaApple, FaRegTrashAlt } from "react-icons/fa";
import { LuArrowDownUp, LuFolderPlus } from "react-icons/lu";

const episodes = Array.from({ length: 12 }).map((_, i) => `Frieren S1E${i + 1}`);

export default function MiniUI() {
    const [previewSrc, setPreviewSrc] = useState(
        "/gifs/Sousou no Frieren - 01_0109.gif",
    );

    return (
        <div className="mini-ui">
            {/* OS title bar */}
            <div className="app-titlebar">
                <span className="tb-title">
                    <span>AMV</span>erge
                </span>
                <div className="tb-winbtns">
                    <span className="tb-dot" />
                    <span className="tb-dot" />
                    <span className="tb-dot tb-close" />
                </div>
            </div>

            {/* App header */}
            <div className="app-header">
                <div className="ah-left">
                    <span className="ah-icon active"><FiHome /></span>
                    <span className="ah-icon"><FiMenu /></span>
                    <span className="ah-icon"><FiSettings /></span>
                    <FiChevronLeft className="ah-back" />
                    <span className="ah-logo">
                        <span>AMV</span>erge
                    </span>
                    <FaDiscord className="ah-discord" />
                </div>
                <div className="ah-right">
                    <span className="ah-grid">Grid: 6 columns</span>
                    <button className="ah-step">-</button>
                    <button className="ah-step">+</button>
                </div>
            </div>

            {/* Body: sidebar | main | right */}
            <div className="app-body">
                {/* Sidebar */}
                <aside className="app-sidebar">
                    <div className="sb-head">
                        <span>Episode Panel</span>
                        <div className="sb-head-icons">
                            <LuArrowDownUp />
                            <LuFolderPlus />
                            <FaRegTrashAlt />
                        </div>
                    </div>
                    <div className="sb-list">
                        {episodes.map((ep, i) => (
                            <span
                                key={ep}
                                className={`sb-item ${i === 0 ? "active" : ""}`}
                            >
                                {ep}
                            </span>
                        ))}
                    </div>
                    <div className="sb-warning">
                        <strong>WARNING</strong>
                        AMVerge V2 will revamp how episodes are stored, and all data
                        will be wiped. Treat this panel as temporary storage.
                    </div>
                </aside>

                {/* Main */}
                <main className="app-main">
                    <div className="am-toolbar">
                        <button className="am-import">
                            <FiFilePlus /> Import Episode
                        </button>
                        <label className="am-check">
                            <span className="am-box" /> Preview All
                        </label>
                        <label className="am-check">
                            <span className="am-box" /> 3 selected
                        </label>
                    </div>
                    <div className="am-grid">
                        {Array.from({ length: 35 }).map((_, i) => {
                            const num = String(i + 109).padStart(4, "0");
                            const src = `/gifs/Sousou no Frieren - 01_${num}.gif`;
                            return (
                                <div
                                    key={i}
                                    className={`am-cell${previewSrc === src ? " active" : ""}`}
                                    onClick={() => setPreviewSrc(src)}
                                >
                                    <img src={src} alt={`clip ${num}`} loading="lazy" />
                                </div>
                            );
                        })}
                    </div>
                </main>

                {/* Right panel */}
                <aside className="app-right">
                    <div className="rp-preview">
                        <img src={previewSrc} alt="preview" />
                    </div>

                    <div className="rp-card">
                        <div className="rp-card-head">
                            <FiFilePlus /> EXPORT SETTINGS
                        </div>
                        <div className="rp-row">
                            <div className="rp-select">
                                <div className="rp-select-main">
                                    <strong>DEFAULT MP4</strong>
                                    <span>H.264 High · AAC · MP4</span>
                                </div>
                                <FiChevronDown />
                            </div>
                            <span className="rp-browse"><FiEdit2 /></span>
                        </div>
                        <div className="rp-row">
                            <div className="rp-dest">Select destination...</div>
                            <span className="rp-browse"><FiFolder /></span>
                        </div>
                        <div className="rp-row rp-opts">
                            <label className="rp-opt">
                                MERGE CLIPS <span className="am-box checked" />
                            </label>
                            <label className="rp-opt rp-opt-lang">
                                PREVIEW LANGUAGE
                                <span className="rp-mini-select">EN <FiChevronDown /></span>
                            </label>
                        </div>
                        <button className="rp-export-main">
                            <FiFilePlus /> Export Now
                        </button>
                    </div>

                    <div className="rp-card">
                        <div className="rp-card-head between">
                            <span><FiHelpCircle /> HOW TO USE</span>
                            <FiChevronUp />
                        </div>
                        <div className="rp-tabs">
                            <span className="rp-tab active"><FaWindows /> Windows</span>
                            <span className="rp-tab"><FaApple /> macOS</span>
                        </div>
                        <ol className="rp-steps">
                            <li>Select clips with <b>Ctrl + Click</b> or <b>Shift + Click</b></li>
                            <li>Double click to <b>Focus</b> a clip</li>
                            <li>Select <b>Export Profile</b> for export settings</li>
                            <li>Click <b>Export Now</b> to start the process</li>
                        </ol>
                    </div>
                </aside>
            </div>
        </div>
    );
}
