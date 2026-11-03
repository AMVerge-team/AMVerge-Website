import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useFadeIn } from "../../hooks/useFadeIn";

// six clips per word in public/clips/search/, named <slug>_<0-5>.webp; new clips need new names, browsers cache these
const results = (slug: string) => Array.from({ length: 6 }, (_, i) => `/clips/search/${slug}_${i}.webp`);

const SEARCHES = [
    { query: "Magic", clips: results("magic") },
    { query: "Wide shot", clips: results("wide-shot") },
    { query: "Eye", clips: results("eye") },
    { query: "Closeup", clips: results("closeup") },
    { query: "Sky", clips: results("sky") },
    { query: "Elf", clips: results("elf") },
];

const TYPE_MS = 110;
const DELETE_MS = 55;
const SHOW_MS = 3800;
const NEXT_WORD_MS = 250;

type Phase = "typing" | "showing" | "deleting";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function SceneScoutDemo() {
    const sectionRef = useFadeIn<HTMLDivElement>();
    const demoRef = useRef<HTMLDivElement>(null);
    const [reducedMotion] = useState(prefersReducedMotion);
    const [index, setIndex] = useState(0);
    const [typed, setTyped] = useState(reducedMotion ? SEARCHES[0].query : "");
    const [phase, setPhase] = useState<Phase>(reducedMotion ? "showing" : "typing");
    const [inView, setInView] = useState(false);

    const search = SEARCHES[index];

    useEffect(() => {
        const el = demoRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.1 });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // the loop only runs on screen, so it picks up where it left off when scrolled back
    useEffect(() => {
        if (!inView || reducedMotion) return;

        let step: () => void;
        let delay: number;
        if (phase === "typing" && typed === search.query) {
            step = () => setPhase("showing");
            delay = 0;
        } else if (phase === "typing") {
            step = () => setTyped(search.query.slice(0, typed.length + 1));
            delay = typed ? TYPE_MS : NEXT_WORD_MS;
        } else if (phase === "showing") {
            step = () => setPhase("deleting");
            delay = SHOW_MS;
        } else if (typed) {
            step = () => setTyped(typed.slice(0, -1));
            delay = DELETE_MS;
        } else {
            step = () => {
                setIndex((index + 1) % SEARCHES.length);
                setPhase("typing");
            };
            delay = 0;
        }

        const timer = window.setTimeout(step, delay);
        return () => window.clearTimeout(timer);
    }, [inView, reducedMotion, phase, typed, index, search.query]);

    // the next word's gifs are ready by the time it finishes typing
    useEffect(() => {
        if (!inView || reducedMotion) return;
        SEARCHES[(index + 1) % SEARCHES.length].clips.forEach((src) => {
            new Image().src = src;
        });
    }, [inView, reducedMotion, index]);

    return (
        <div id="scene-scout" className="scout-demo-section fade-in" ref={sectionRef}>
            <div className="scout-demo-text">
                <div className="section-head">
                    <h1>
                        Find Any Scene.<br />
                        <span>Just Describe It.</span>
                    </h1>
                </div>
                <p>
                    Scene Scout lets you search whole episodes by describing what you want.
                    Index them once, type a few words, and every match is ready to preview and export.
                </p>
            </div>

            <div className="scout-demo" ref={demoRef}>
                <div className="scout-demo-bar" role="img" aria-label={`Scene Scout search bar searching for ${search.query}`}>
                    <FiSearch className="scout-demo-icon" aria-hidden="true" />
                    <span className="scout-demo-query" aria-hidden="true">
                        {typed}
                        <span className="scout-demo-caret" />
                    </span>
                </div>

                <div className={`scout-demo-grid${phase === "showing" ? " is-showing" : ""}`}>
                    {search.clips.map((src) => (
                        <div key={`${search.query}-${src}`} className="scout-demo-cell">
                            <img src={src} alt={`Scene Scout result for ${search.query}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
