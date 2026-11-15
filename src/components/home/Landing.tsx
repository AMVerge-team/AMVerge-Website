import { useState, useEffect, useRef } from "react";
import { FiGithub } from "react-icons/fi";
import { FaDiscord } from "react-icons/fa";
import ContributorAvatars from "../ui/ContributorAvatars";
import DownloadDropdown from "../ui/DownloadDropdown";
import { fetchLatestRelease } from "../../services/github";
import {
  DOWNLOAD_COUNT_EVENT,
  INITIAL_DOWNLOAD_COUNT,
  fetchDownloadCount,
} from "../../utils/download";

export default function Landing() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasAnimatedRef = useRef(false);
  const [version, setVersion] = useState("");
  const [downloadCount, setDownloadCount] = useState<number | null>(null);
  const [displayCount, setDisplayCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchLatestRelease()
      .then((r) => {
        if (!cancelled) setVersion(r.release.tag_name);
      })
      .catch(() => {});
    fetchDownloadCount()
      .then((count) => {
        if (!cancelled) setDownloadCount(count);
      })
      .catch(() => {
        if (!cancelled) setDownloadCount(INITIAL_DOWNLOAD_COUNT);
      });

    const onCountUpdated = (e: Event) => {
      const next = (e as CustomEvent<number>).detail;
      if (typeof next === "number" && Number.isFinite(next)) {
        setDownloadCount(next);
      }
    };
    window.addEventListener(DOWNLOAD_COUNT_EVENT, onCountUpdated);
    return () => {
      cancelled = true;
      window.removeEventListener(DOWNLOAD_COUNT_EVENT, onCountUpdated);
    };
  }, []);

  useEffect(() => {
    if (downloadCount === null) return;
    if (hasAnimatedRef.current) {
      setDisplayCount(downloadCount);
      return;
    }
    let start = 0;
    const duration = 1500;
    const step = Math.max(1, Math.ceil(downloadCount / (duration / 16)));
    const timer = setInterval(() => {
      start += step;
      if (start >= downloadCount) {
        hasAnimatedRef.current = true;
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
          {version && <p className="hero-badge">{version} · Windows / macOS</p>}
          <h1 className="hero-title">
            <span>AMV</span>erge
          </h1>
          <p className="hero-subtitle">
            Scene selection made easy.
          </p>
          <div className="hero-actions">
            <DownloadDropdown buttonClassName="hero-download" align="center" />
            <p className="hero-count">
              {downloadCount === null
                ? "Loading..."
                : `${displayCount.toLocaleString()}+ downloads`}
            </p>
            <div className="hero-links">
              <a
                className="hero-link"
                href="https://github.com/AMVerge-team/AMVerge"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub /> GitHub
              </a>
              <a
                className="hero-link hero-link-discord"
                href="https://discord.com/invite/bmXjTgsAaN"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaDiscord /> Discord
              </a>
            </div>
            <div className="hero-contrib">
              <ContributorAvatars limit={3} />
              <span>Built by the community</span>
            </div>
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
