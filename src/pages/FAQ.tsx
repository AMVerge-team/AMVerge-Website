import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";

const faqs = [
    {
        q: "What is AMVerge?",
        a: "A desktop scene selection tool for AMV editors. It splits any video into individual scenes and shows them in a grid so you can find and export clips fast, no timeline scrubbing required.",
    },
    {
        q: "Is it free?",
        a: "Yes. AMVerge is free and open source. Grab the latest build from the download button or GitHub releases.",
    },
    {
        q: "What platforms are supported?",
        a: "Windows 10/11 and macOS. The download provides installers for both platforms.",
    },
    {
        q: "What video formats can I import?",
        a: "Anime episodes, movies, or any common video file. AMVerge runs automatic scene detection and exports clips as MP4, MKV, or MOV.",
    },
    {
        q: "Detection made too many cuts. Can I fix that?",
        a: "Yes. Select the extra clips and use Merge to join them back into one seamless scene before exporting. AMVerge also uses CLIP similarity to suggest merges automatically.",
    },
    {
        q: "Where can I report bugs or request features?",
        a: "Open an issue on the GitHub repository. Links are in the footer, or use the Discord server.",
    },
    {
        q: "Can I import clips directly into my editor?",
        a: "Yes. AMVerge supports direct import to DaVinci Resolve, After Effects, Premiere Pro, and CapCut. No manual reimport needed.",
    },
    {
        q: "Does it work with non-anime videos?",
        a: "Yes. Any video file works. The scene detection is format-agnostic and works on live action, animation, or any content.",
    },
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <div className="page page-faq">
            <div className="section-head">
                <span className="section-eyebrow">Got questions?</span>
                <h1 className="page-title">
                    Frequently Asked <span>Questions</span>
                </h1>
            </div>
            <p className="page-sub">
                Everything you need to know about AMVerge. Can't find what you're looking for?{" "}
                <a href="https://discord.com/invite/bmXjTgsAaN" target="_blank" rel="noopener noreferrer">
                    Ask on Discord.
                </a>
            </p>

            <div className="faq-list fade-in-children">
                {faqs.map((item, i) => {
                    const isOpen = open === i;
                    return (
                        <div className={`faq-item ${isOpen ? "open" : ""}`} key={item.q}>
                            <button className="faq-q" onClick={() => setOpen(isOpen ? null : i)}>
                                <span className="faq-num">{String(i + 1).padStart(2, '0')}</span>
                                <span className="faq-q-text">{item.q}</span>
                                <FiChevronDown className="faq-chevron" />
                            </button>
                            <div className={`faq-a-wrap ${isOpen ? "open" : ""}`}>
                                <p className="faq-a">{item.a}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="faq-footer">
                <FaDiscord />
                <p>
                    Still have questions?{" "}
                    <a href="https://discord.com/invite/bmXjTgsAaN" target="_blank" rel="noopener noreferrer">
                        Join our Discord
                    </a>{" "}
                    and ask the community.
                </p>
            </div>
        </div>
    );
}
