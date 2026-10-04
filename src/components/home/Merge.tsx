import { useState, useEffect } from "react";
import { useFadeIn } from "../../hooks/useFadeIn";
import mergeContent from "../../content/home/merge.yaml";
import { formatBrandText } from "../../utils/formatText";
import { FiCheck, FiRefreshCw, FiScissors, FiMousePointer } from "react-icons/fi";

interface MergedGroup {
    id: string;
    indices: number[];
}

export default function Merge() {
    const ref = useFadeIn<HTMLDivElement>();
    const count = mergeContent.clipCount || 24;
    const startNum = mergeContent.clipStartNum || 109;
    const prefix = mergeContent.clipPrefix || "/gifs/Sousou no Frieren - 01_";

    const [selected, setSelected] = useState<number[]>([]);
    const [mergedGroups, setMergedGroups] = useState<MergedGroup[]>([]);
    const [activeFrame, setActiveFrame] = useState<Record<string, number>>({});

    // Toggle clip selection
    const toggleSelect = (index: number) => {
        // If part of an already merged group, ignore or split
        const inGroup = mergedGroups.find(g => g.indices.includes(index));
        if (inGroup) return;

        setSelected(prev => {
            if (prev.includes(index)) {
                return prev.filter(i => i !== index);
            }
            // Sort to keep ordered
            return [...prev, index].sort((a, b) => a - b);
        });
    };

    // Merge selected clips
    const handleMerge = () => {
        if (selected.length < 2) return;
        const newGroup: MergedGroup = {
            id: `group-${Date.now()}`,
            indices: [...selected],
        };
        setMergedGroups(prev => [...prev, newGroup]);
        setSelected([]);
    };

    // Split / unmerge a group
    const handleSplit = (groupId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setMergedGroups(prev => prev.filter(g => g.id !== groupId));
    };

    // Reset everything
    const handleReset = () => {
        setSelected([]);
        setMergedGroups([]);
    };

    // Smoothly cycle through clips inside merged groups for continuous preview
    useEffect(() => {
        if (mergedGroups.length === 0) return;
        const interval = setInterval(() => {
            setActiveFrame(prev => {
                const next = { ...prev };
                mergedGroups.forEach(g => {
                    const current = next[g.id] ?? 0;
                    next[g.id] = (current + 1) % g.indices.length;
                });
                return next;
            });
        }, 1200);
        return () => clearInterval(interval);
    }, [mergedGroups]);

    // Build the rendered item list
    const renderedItems: React.ReactNode[] = [];
    const skippedIndices = new Set<number>();

    for (let i = 0; i < count; i++) {
        if (skippedIndices.has(i)) continue;

        const group = mergedGroups.find(g => g.indices.includes(i));

        if (group && group.indices[0] === i) {
            // Mark other indices in this group as skipped
            group.indices.forEach(idx => skippedIndices.add(idx));

            const frameIndex = activeFrame[group.id] ?? 0;
            const currentClipNum = String(group.indices[frameIndex] + startNum).padStart(4, "0");
            const firstNum = String(group.indices[0] + startNum).padStart(4, "0");
            const lastNum = String(group.indices[group.indices.length - 1] + startNum).padStart(4, "0");

            renderedItems.push(
                <div
                    key={group.id}
                    className="clip-cell merged-cell"
                >
                    <img
                        src={`${prefix}${currentClipNum}.gif`}
                        alt={`merged clip ${firstNum}-${lastNum}`}
                    />
                    <div className="merged-tag">
                        <span className="merged-pulse" />
                        Merged ({firstNum} - {lastNum})
                    </div>
                    <button
                        className="split-btn"
                        onClick={(e) => handleSplit(group.id, e)}
                        title="Split back into separate clips"
                    >
                        <FiScissors /> {mergeContent.splitBtnLabel || "Split"}
                    </button>
                </div>
            );
        } else if (!group) {
            const isSelected = selected.includes(i);
            const num = String(i + startNum).padStart(4, "0");

            renderedItems.push(
                <div
                    key={i}
                    className={`clip-cell ${isSelected ? "selected" : ""}`}
                    onClick={() => toggleSelect(i)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && toggleSelect(i)}
                >
                    <img
                        src={`${prefix}${num}.gif`}
                        alt={`clip ${num}`}
                        loading="lazy"
                    />
                    {isSelected && (
                        <div className="select-badge">
                            <FiCheck />
                        </div>
                    )}
                </div>
            );
        }
    }

    return (
        <div id="merge-section" className="merge-info-section fade-in" ref={ref}>
            <div className="merge-info-text">
                <div className="section-head">
                    <span className="section-eyebrow">{mergeContent.eyebrow}</span>
                    <h1>{mergeContent.title}</h1>
                </div>
                <p>{formatBrandText(mergeContent.description)}</p>
                {mergeContent.instruction && (
                    <span className="merge-instruction">
                        <FiMousePointer /> {mergeContent.instruction}
                    </span>
                )}
            </div>

            {/* Interactive action toolbar */}
            <div className={`merge-toolbar ${selected.length > 0 || mergedGroups.length > 0 ? "visible" : ""}`}>
                {selected.length > 0 && (
                    <button
                        className="merge-act-btn"
                        onClick={handleMerge}
                        disabled={selected.length < 2}
                    >
                        {selected.length > 1 
                            ? `Merge ${selected.length} Clips` 
                            : (mergeContent.mergeBtnLabel || "Merge Selected Clips")}
                    </button>
                )}
                {(selected.length > 0 || mergedGroups.length > 0) && (
                    <button className="merge-reset-btn" onClick={handleReset}>
                        <FiRefreshCw /> {mergeContent.resetBtnLabel || "Reset"}
                    </button>
                )}
            </div>

            <div className="merge-clip-grid">
                {renderedItems}
            </div>
        </div>
    );
}