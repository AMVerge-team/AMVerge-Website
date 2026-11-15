import { useEffect, useRef, useState } from "react";
import { FiChevronDown, FiDownload, FiLayers } from "react-icons/fi";
import { FaApple, FaWindows } from "react-icons/fa";
import {
    fetchLatestExtensionRelease,
    fetchLatestRelease,
} from "../../services/github";
import { downloadTarget, type DownloadTarget } from "../../utils/download";

type Props = {
    buttonClassName: string;
    label?: string;
    align?: "left" | "center" | "right";
    placement?: "down" | "up";
    onDownloaded?: () => void;
};

export default function DownloadDropdown({
    buttonClassName,
    label = "Download",
    align = "center",
    placement = "down",
    onDownloaded,
}: Props) {
    const rootRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [downloading, setDownloading] = useState<DownloadTarget | null>(null);
    const [appTag, setAppTag] = useState<string | null>(null);
    const [extTag, setExtTag] = useState<string | null>(null);

    useEffect(() => {
        if (!open) return;

        let cancelled = false;
        fetchLatestRelease()
            .then(({ release }) => {
                if (!cancelled) setAppTag(release.tag_name);
            })
            .catch(() => {});
        fetchLatestExtensionRelease()
            .then(({ release }) => {
                if (!cancelled) setExtTag(release.tag_name);
            })
            .catch(() => {});

        const onPointerDown = (e: PointerEvent) => {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };

        document.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            cancelled = true;
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [open]);

    async function handleSelect(target: DownloadTarget) {
        if (downloading) return;
        setDownloading(target);
        setOpen(false);
        try {
            const ok = await downloadTarget(target);
            if (!ok) {
                alert("Could not find the latest download on GitHub.");
                return;
            }
            onDownloaded?.();
        } finally {
            setDownloading(null);
        }
    }

    return (
        <div
            ref={rootRef}
            className={`dl-dropdown dl-dropdown--${align} dl-dropdown--${placement}${open ? " is-open" : ""}`}
        >
            <button
                type="button"
                className={`${buttonClassName} dl-trigger`}
                onClick={() => setOpen((v) => !v)}
                disabled={downloading !== null}
                aria-haspopup="menu"
                aria-expanded={open}
            >
                <FiDownload />
                <span>{downloading ? "Downloading..." : label}</span>
                <FiChevronDown className="dl-chevron" aria-hidden="true" />
            </button>

            {open && (
                <div className="dl-menu" role="menu">
                    <button
                        type="button"
                        className="dl-item"
                        role="menuitem"
                        onClick={() => void handleSelect("windows")}
                    >
                        <span className="dl-item-icon"><FaWindows aria-hidden="true" /></span>
                        <span className="dl-item-text">
                            <span className="dl-item-title">Windows App</span>
                            <span className="dl-item-sub">Installer (.exe)</span>
                        </span>
                        {appTag && <span className="dl-item-tag">{appTag}</span>}
                    </button>

                    <button
                        type="button"
                        className="dl-item"
                        role="menuitem"
                        onClick={() => void handleSelect("mac")}
                    >
                        <span className="dl-item-icon"><FaApple aria-hidden="true" /></span>
                        <span className="dl-item-text">
                            <span className="dl-item-title">Mac App</span>
                            <span className="dl-item-sub">Universal (.dmg)</span>
                        </span>
                        {appTag && <span className="dl-item-tag">{appTag}</span>}
                    </button>

                    <div className="dl-divider" role="separator" />

                    <button
                        type="button"
                        className="dl-item"
                        role="menuitem"
                        onClick={() => void handleSelect("extension")}
                    >
                        <span className="dl-item-icon"><FiLayers aria-hidden="true" /></span>
                        <span className="dl-item-text">
                            <span className="dl-item-title">AE Extension</span>
                            <span className="dl-item-sub">Universal AE 2018+</span>
                        </span>
                        {extTag && <span className="dl-item-tag">{extTag}</span>}
                    </button>
                </div>
            )}
        </div>
    );
}
