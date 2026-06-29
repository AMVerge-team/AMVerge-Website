import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
    {
        q: "What is AMVerge?",
        a: "A scene selection tool for AMV editors. It splits any video into individual scenes and shows them in a grid so you can find and export clips fast.",
    },
    {
        q: "Is it free?",
        a: "Yes. AMVerge is free to download. Grab the latest build from the download button or GitHub.",
    },
    {
        q: "What platforms are supported?",
        a: "Windows desktop. The download provides a Windows .exe build.",
    },
    {
        q: "What video formats can I import?",
        a: "Anime episodes, movies, or any common video file. AMVerge runs scene detection and exports clips as MP4.",
    },
    {
        q: "Detection made too many cuts. Can I fix that?",
        a: "Yes. Select the extra clips and use Merge to join them back into one seamless scene before exporting.",
    },
    {
        q: "Where can I report bugs or request features?",
        a: "Open an issue on the GitHub repository. Links are in the footer.",
    },
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <div className="page page-faq">
            <header className="page-header">
                <h1><span>FAQ</span></h1>
                <p>Common questions about AMVerge.</p>
            </header>

            <div className="faq-list">
                {faqs.map((item, i) => {
                    const isOpen = open === i;
                    return (
                        <div className={`faq-item ${isOpen ? "open" : ""}`} key={item.q}>
                            <button className="faq-q" onClick={() => setOpen(isOpen ? null : i)}>
                                {item.q}
                                <FiChevronDown className="faq-chevron" />
                            </button>
                            {isOpen && <p className="faq-a">{item.a}</p>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
