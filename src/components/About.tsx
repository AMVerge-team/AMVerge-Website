import MiniUI from "./MiniUI";
import { useFadeIn } from "../hooks/useFadeIn";

export default function About() {
    const ref = useFadeIn<HTMLDivElement>();

    return (
        <div id="about" className="about-section fade-in" ref={ref}>
            <div className="about-text-wrapper">
                <div className="about-text">
                    <h1><span>All-In-One</span> Scene Selection Tool</h1>
                    <p>
                        AMVerge takes in an anime episode, movie, or any video and automatically segments them into individual scenes for easy browsing.
                        <br/><br/>
                        Features:
                    </p>
                    <ul>
                        <li>Automatic scene (I-Frame) detection</li>
                        <li>Smooth navigation across scenes</li>
                        <li>Instant clip preview on hover</li>
                        <li>Merging selected clips into a single montage</li>
                        <li>Automatic MP4 Conversion</li>
                        <li>Customizable workflow</li>
                    </ul>
                </div>
            </div>
            <div className="about-ui-section">
                <MiniUI />
            </div>
        </div>
    )
}