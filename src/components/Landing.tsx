import { useState, useEffect } from "react";
import { FiDownload, FiGithub } from "react-icons/fi";

async function downloadLatest() {
    const res = await fetch("https://api.github.com/repos/crptk/AMVerge/releases/latest");
    const data = await res.json();
    const exe = data.assets?.find((a: { name: string }) => a.name.endsWith(".exe") && !a.name.endsWith(".sig"));
    if (exe) window.location.href = exe.browser_download_url;
}

export default function Landing() {
    const [showMoreInfo, setShowMoreInfo] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setShowMoreInfo(window.scrollY < 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div id="home">
            <section>
                <div className="title-wrapper">
                    <h1 className="AMVerge-title"><span>AMV</span>erge</h1>
                    <h1 className="AMVerge-subtitle">Scene selection made easy.</h1>
                    <button className="download-btn landing-download" onClick={downloadLatest}><FiDownload /> Download</button>
                    <a className="view-source-btn" href="https://github.com/crptk/AMVerge" target="_blank" rel="noopener noreferrer"><FiGithub /> View Source</a>
                    <div className={`more-info ${showMoreInfo ? 'visible' : 'hidden'}`}>
                        <span>More Info</span>
                        <div className="bounce-arrows">
                            <span>&#x25BC;</span>
                            <span>&#x25BC;</span>
                        </div>
                    </div>
                </div> 
            </section>
        </div>
    )
}