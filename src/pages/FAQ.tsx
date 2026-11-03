import { useState, useEffect } from "react";
import { FiArrowUpRight, FiChevronDown } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import useSEO from "../hooks/useSEO";
import { BUILT_IN_FAQ, fetchFaqItems } from "../services/faq";
import type { FaqItem } from "../services/faq";

function FaqAnswer({ item }: { item: FaqItem }) {
    return (
        <div className="faq-a">
            <div className="faq-a-body">
            {item.answer.split("\n\n").map((block) => {
                const lines = block.split("\n");
                const intro = lines.filter((line) => !line.startsWith("- "));
                const bullets = lines.filter((line) => line.startsWith("- "));
                return (
                    <div key={block}>
                        {intro.length > 0 && <p>{intro.join(" ")}</p>}
                        {bullets.length > 0 && (
                            <ul>
                                {bullets.map((line) => (
                                    <li key={line}>{line.slice(2)}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                );
            })}
            {item.link && (
                <a className="faq-a-link" href={item.link.href} target="_blank" rel="noopener noreferrer">
                    {item.link.label} <FiArrowUpRight aria-hidden="true" />
                </a>
            )}
            </div>
        </div>
    );
}

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(null);
    const [faqs, setFaqs] = useState<FaqItem[]>(BUILT_IN_FAQ);

    useSEO({
        title: "FAQ",
        description: "Frequently asked questions about AMVerge. Is it free? What platforms? What formats? Find answers about the free scene selection tool for AMV editors.",
    });

    useEffect(() => {
        fetchFaqItems()
            .then((items) => {
                const known = new Set(BUILT_IN_FAQ.map((item) => item.question.toLowerCase()));
                setFaqs([...BUILT_IN_FAQ, ...items.filter((item) => !known.has(item.question.toLowerCase()))]);
            })
            .catch(() => {});
    }, []);

    return (
        <div className="page page-faq">
            <div className="section-head">
                <h1 className="page-title">
                    Frequently Asked <span>Questions</span>
                </h1>
            </div>

            <div className="faq-list fade-in-children">
                {faqs.map((item, i) => {
                    const isOpen = open === i;
                    return (
                        <div className={`faq-item ${isOpen ? "open" : ""}`} key={item.id}>
                            <button className="faq-q" onClick={() => setOpen(isOpen ? null : i)}>
                                <span className="faq-q-text">{item.question}</span>
                                <FiChevronDown className="faq-chevron" />
                            </button>
                            <div className={`faq-a-wrap ${isOpen ? "open" : ""}`}>
                                <FaqAnswer item={item} />
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
                        Ask on Discord.
                    </a>{" "}
                </p>
            </div>
        </div>
    );
}
