import { useState } from "react";
import { FaFolderOpen } from "react-icons/fa";
export default function MiniUI() {
    const [previewSrc, setPreviewSrc] = useState("/clips/Sousou no Frieren - 01_0109.gif");
    return (
        <div className="mini-ui">
            <div className="side-panel">
                <button>Home</button>
                <button>Settings</button>
                <div className="episode-panel">
                    <h3>Episode Panel</h3>
                    <div className="episode-btn-row">
                        <button>Sort A-Z</button>
                        <button>New folder</button>
                        <button>Clear</button>
                    </div>
                    <div className="episode-list">
                        <h3>Frieren S1E1</h3>
                        <h3>Frieren S1E2</h3>
                        <h3>Frieren S1E3</h3>
                        <h3>Frieren S1E4</h3>
                        <h3>Frieren S1E5</h3>
                        <h3>Frieren S1E6</h3>
                        <h3>Frieren S1E7</h3>
                        <h3>Frieren S1E8</h3>
                        <h3>Frieren S1E9</h3>
                        <h3>Frieren S1E10</h3>
                        <h3>Frieren S1E11</h3>
                        <h3>Frieren S1E12</h3>
                    </div>
                </div>
            </div>
            <div className="main-content">
                <div className="ui-navbar">
                    <div className="arrow">&gt;</div>
                    <h1><span>AMV</span>erge</h1>
                </div>
                <div className="import-buttons">
                    <button className="import-button">Import Episode</button>
                    <div className="checkbox"></div>
                    <h3 className="grid-preview">Grid Preview</h3>
                    <div className="grey-checkbox"></div>
                    <h3 className="selected-count">0 selected</h3>
                    <div className="size-btns">
                        <p>Size: 95px</p>
                        <div>
                            <button className="size-minus">-</button>
                            <button className="size-plus">+</button>
                        </div>
                    </div>
                </div>
                <div className="main-window">
                    <div className="left-pane">
                        <div className="clips-grid">
                            {Array.from({ length: 35}).map((_, i) => {
                                const num = String(i + 109).padStart(4, '0');
                                const src = `/clips/Sousou no Frieren - 01_${num}.gif`;
                                return (
                                    <div key={i} className={`clip-cell${previewSrc === src ? ' active' : ''}`} onClick={() => setPreviewSrc(src)}>
                                        <img src={src} alt={`clip ${num}`} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="right-pane">
                        <div className="preview-panel">
                            <div className="preview-video">
                                <img src={previewSrc} alt="preview" />
                            </div>
                            <div className="merge-row">
                                <div className="merge-checkbox">✓</div>
                                <span>Merge Clips</span>
                            </div>
                            <div className="export-path-row">
                                <div className="export-path-input">C:/path/to/export/directory</div>
                                <div className="folder-icon">
                                    <FaFolderOpen />
                                </div>
                            </div>
                            <button className="export-btn">Export</button>
                            <div className="how-to-use">
                                <h4>HOW TO USE:</h4>
                                <p>Windows:</p>
                                <ul>
                                    <li>Select multiple clips with Ctrl + Click, Shift + Click, or Double Click</li>
                                    <li>Click "Merge clips" to merge, or leave unchecked to export separately</li>
                                    <li>Click Export to export clips</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    );
}