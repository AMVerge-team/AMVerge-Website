import { useState, useEffect } from "react";
import { FiDownload, FiGithub } from "react-icons/fi";

type GithubAsset = {
  name: string;
  browser_download_url: string;
  download_count: number;
};

type GithubRelease = {
  assets?: GithubAsset[];
};

async function getLatestExeAsset(): Promise<GithubAsset | null> {
  try {
    const res = await fetch("https://api.github.com/repos/crptk/AMVerge/releases/latest");
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

    const data = await res.json();

    const exe = data.assets?.find(
      (a: GithubAsset) => a.name.endsWith(".exe") && !a.name.endsWith(".sig")
    );

    return exe ?? null;
  } catch (err) {
    console.error("Failed to fetch latest release asset:", err);
    return null;
  }
}

async function getCumulativeDownloadCount(): Promise<number> {
  try {
    const res = await fetch("https://api.github.com/repos/crptk/AMVerge/releases");
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

    const releases: GithubRelease[] = await res.json();

    let total = 0;

    for (const release of releases) {
      for (const asset of release.assets ?? []) {
        if (asset.name.endsWith(".exe") && !asset.name.endsWith(".sig")) {
          total += asset.download_count ?? 0;
        }
      }
    }

    return total;
  } catch (err) {
    console.error("Failed to fetch cumulative download count:", err);
    return 0;
  }
}

export default function Landing() {
  const [showMoreInfo, setShowMoreInfo] = useState(true);
  const [downloadCount, setDownloadCount] = useState<number | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getCumulativeDownloadCount().then(setDownloadCount);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setShowMoreInfo(window.scrollY < 80);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  async function handleDownload() {
    if (downloading) return;

    setDownloading(true);

    try {
      const exe = await getLatestExeAsset();

      if (!exe?.browser_download_url) {
        alert("Could not find the latest .exe download.");
        return;
      }

      window.location.href = exe.browser_download_url;
    } catch (err) {
      console.error("Download failed:", err);
      alert("Something went wrong while starting the download.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div id="home" className={`landing-fade ${loaded ? "visible" : ""}`}>
      <section>
        <div className="title-wrapper">
          <h1 className="AMVerge-title">
            <span>AMV</span>erge
          </h1>
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

          <div className={`more-info ${showMoreInfo ? "visible" : "hidden"}`}>
            <span>More Info</span>
            <div className="bounce-arrows">
              <span>&#x25BC;</span>
              <span>&#x25BC;</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}