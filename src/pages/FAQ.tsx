import { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import useSEO from "../hooks/useSEO";
import { fetchFaqItems } from "../services/faq";
import type { FaqItem } from "../services/faq";
import { SkeletonText } from "../components/ui/Skeleton";

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(null);
    const [faqs, setFaqs] = useState<FaqItem[]>([]);
    const [loading, setLoading] = useState(true);

    useSEO({
        title: "FAQ",
        description: "Frequently asked questions about AMVerge. Is it free? What platforms? What formats? Find answers about the free scene selection tool for AMV editors.",
    });

    useEffect(() => {
        fetchFaqItems()
            .then(setFaqs)
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

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
                {loading && <SkeletonText lines={4} />}
                {!loading && faqs.length === 0 && (
                    <p className="page-muted">No FAQ items available.</p>
                )}
                {faqs.map((item, i) => {
                    const isOpen = open === i;
                    return (
                        <div className={`faq-item ${isOpen ? "open" : ""}`} key={item.id}>
                            <button className="faq-q" onClick={() => setOpen(isOpen ? null : i)}>
                                <span className="faq-num">{String(i + 1).padStart(2, '0')}</span>
                                <span className="faq-q-text">{item.question}</span>
                                <FiChevronDown className="faq-chevron" />
                            </button>
                            <div className={`faq-a-wrap ${isOpen ? "open" : ""}`}>
                                <p className="faq-a">{item.answer}</p>
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
