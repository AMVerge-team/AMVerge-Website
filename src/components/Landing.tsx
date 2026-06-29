import { useState, useEffect, useRef } from "react";
import { FiDownload } from "react-icons/fi";

type GithubAsset = {
  name: string;
  browser_download_url: string;
  download_count: number;
};

type GithubRelease = {
  tag_name: string;
  assets?: GithubAsset[];
};

type LatestRelease = {
  exe: GithubAsset | null;
  version: string;
};

async function getLatestRelease(): Promise<LatestRelease> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/crptk/AMVerge/releases/latest",
    );
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const data: GithubRelease = await res.json();
    const exe =
      data.assets?.find(
        (a: GithubAsset) =>
          a.name.endsWith(".exe") && !a.name.endsWith(".sig"),
      ) ?? null;
    return { exe, version: data.tag_name };
  } catch (err) {
    console.error("Failed to fetch latest release:", err);
    return { exe: null, version: "" };
  }
}

async function getCumulativeDownloadCount(): Promise<number> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/crptk/AMVerge/releases",
    );
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [version, setVersion] = useState("");
  const [downloadCount, setDownloadCount] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    getLatestRelease().then(({ version: v }) => setVersion(v));
    getCumulativeDownloadCount().then(setDownloadCount);
  }, []);

  useEffect(() => {
    if (downloadCount === null) return;
    let start = 0;
    const duration = 1500;
    const step = Math.max(1, Math.ceil(downloadCount / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= downloadCount) {
        setDisplayCount(downloadCount);
        clearInterval(timer);
      } else {
        setDisplayCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [downloadCount]);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleScroll() {
      setShowScrollHint(window.scrollY < 80);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const attemptPlay = () => {
      video.currentTime = 0;
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {
          console.error("Hero video: all play attempts failed");
        });
      });
    };
    const timer = setTimeout(attemptPlay, 150);
    return () => clearTimeout(timer);
  }, []);

  async function handleDownload() {
    if (downloading) return;
    setDownloading(true);
    try {
      const { exe } = await getLatestRelease();
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
      <section className="hero">
        <video
          ref={videoRef}
          className="hero-video"
          muted
          loop
          playsInline
          preload="auto"
          controls
        >
          <source src="/clips/AMVerge-Video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
        <div className="hero-particles" />
        <div className="hero-grid" />
        <div className="hero-content">
          {version && <p className="hero-badge">{version} · Windows</p>}
          <h1 className="hero-title">
            <span>AMV</span>erge
          </h1>
          <div className="hero-accent-line" />
          <p className="hero-subtitle">
            Turn hours of footage into a browsable scene grid.
            Find, preview, and export the shots you need — in seconds.
          </p>
          <div className="hero-actions">
            <button
              className="hero-download"
              onClick={handleDownload}
              disabled={downloading}
            >
              <FiDownload />{" "}
              {downloading ? "Downloading..." : "Download for Windows"}
            </button>
            <p className="hero-count">
              {downloadCount === null
                ? "Loading..."
                : `${displayCount.toLocaleString()}+ downloads`}
            </p>
          </div>
        </div>
        <div
          className={`scroll-hint ${showScrollHint ? "visible" : "hidden"}`}
        >
          <span>Scroll to explore</span>
          <div className="bounce-arrows">
            <span>&#x25BC;</span>
            <span>&#x25BC;</span>
          </div>
        </div>
      </section>
    </div>
  );
}
