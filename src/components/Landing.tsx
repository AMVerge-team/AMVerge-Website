import { useState, useEffect } from "react";
import { FiDownload, FiGithub } from "react-icons/fi";
import { incrementDownload, getDownloadCount } from "../utils/counterApi";

async function getLatestDownloadUrl(): Promise<string | null> {
  try {
    const res = await fetch("https://api.github.com/repos/crptk/AMVerge/releases/latest");
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

    const data = await res.json();
    const exe = data.assets?.find(
      (a: { name: string; browser_download_url: string }) =>
        a.name.endsWith(".exe") && !a.name.endsWith(".sig")
    );

    return exe?.browser_download_url ?? null;
  } catch (err) {
    console.error("Failed to fetch latest download URL:", err);
    return null;
  }
}


export default function Landing() {
    const [showMoreInfo, setShowMoreInfo] = useState(true);
    const [downloadCount, setDownloadCount] = useState<number | null>(null);
    const [downloading, setDownloading] = useState(false);

    useEffect(() => {
        getDownloadCount().then(setDownloadCount);
    }, []);


  async function handleDownload() {
    if (downloading) return;

    setDownloading(true);

    try {
      const downloadUrl = await getLatestDownloadUrl();

      if (!downloadUrl) {
        alert("Could not find the latest .exe download.");
        return;
      }

      const count = await incrementDownload();
      if (count !== null) {
        setDownloadCount(count);
      }

      window.location.href = downloadUrl;
    } catch (err) {
      console.error("Download failed:", err);
      alert("Something went wrong while starting the download.");
    } finally {
      setDownloading(false);
    }
  }

    return (
        <div id="home">
            <section>
                <div className="title-wrapper">
                    <h1 className="AMVerge-title"><span>AMV</span>erge</h1>
                    <h1 className="AMVerge-subtitle">Scene selection made easy.</h1>

                    <button 
                        className="download-btn landing-download" 
                        onClick={handleDownload} 
                        disabled={downloading}
                        >
                            <FiDownload /> {downloading ? "Downloading..." : "Download"}
                    </button>
                    <div style={{ color: "#888", fontSize: 14, marginTop: 4, marginBottom: 8 }}>
                        Total downloads: {downloadCount === null ? "..." : downloadCount}
                    </div>
                    <a 
                        className="view-source-btn" 
                        href="https://github.com/crptk/AMVerge" 
                        target="_blank" 
                        rel="noopener noreferrer"
                    >
                        <FiGithub /> View Source
                    </a>
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