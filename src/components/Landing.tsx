import { useState, useEffect, useRef } from "react";
import { FiDownload } from "react-icons/fi";
import {
  fetchLatestRelease,
  fetchReleases,
  cumulativeDownloadCount,
} from "../services/github";

export default function Landing() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [version, setVersion] = useState("");
  const [downloadCount, setDownloadCount] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    fetchLatestRelease()
      .then((r) => setVersion(r.release.tag_name))
      .catch(() => {});
    fetchReleases()
      .then((releases) => setDownloadCount(cumulativeDownloadCount(releases)))
      .catch(() => setDownloadCount(0));
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
      const { exe } = await fetchLatestRelease();
      if (!exe?.browser_download_url) {
        alert("Could not find the latest .exe download.");
        return;
      }
      window.location.href = exe.browser_download_url;
    } catch {
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
