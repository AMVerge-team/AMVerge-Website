import { useRef, useState } from "react";
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize } from "react-icons/fi";

function fmt(t: number) {
    if (!isFinite(t) || t < 0) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
}

type Props = {
    src: string;
    poster?: string;
};

// Custom AMVerge-skinned player: black + --accent + Jersey, matching the
// site and the desktop app's preview player.
export default function VideoPlayer({ src, poster }: Props) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);
    const [playing, setPlaying] = useState(false);
    const [cur, setCur] = useState(0);
    const [dur, setDur] = useState(0);
    const [muted, setMuted] = useState(false);

    const toggle = () => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) v.play().catch(() => {});
        else v.pause();
    };

    const seek = (e: React.MouseEvent<HTMLDivElement>) => {
        const v = videoRef.current;
        if (!v || !dur) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const frac = (e.clientX - rect.left) / rect.width;
        v.currentTime = Math.min(Math.max(frac, 0), 1) * dur;
    };

    const toggleMute = () => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = !v.muted;
        setMuted(v.muted);
    };

    const fullscreen = () => {
        if (document.fullscreenElement) document.exitFullscreen();
        else frameRef.current?.requestFullscreen?.();
    };

    const pct = dur ? (cur / dur) * 100 : 0;

    return (
        <div className={`amv-player ${playing ? "playing" : ""}`} ref={frameRef}>
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                playsInline
                preload="metadata"
                onClick={toggle}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onTimeUpdate={() => setCur(videoRef.current?.currentTime ?? 0)}
                onLoadedMetadata={() => setDur(videoRef.current?.duration ?? 0)}
                onEnded={() => setPlaying(false)}
            />

            {/* AMVerge logo watermark, recolored to --accent via CSS mask */}
            <div className="amv-watermark" aria-hidden="true" />

            {!playing && (
                <button className="amv-bigplay" onClick={toggle} aria-label="Play">
                    <FiPlay />
                </button>
            )}

            <div className="amv-controls">
                <button className="amv-btn" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
                    {playing ? <FiPause /> : <FiPlay />}
                </button>
                <span className="amv-time">{fmt(cur)} / {fmt(dur)}</span>
                <div className="amv-seek" onClick={seek}>
                    <div className="amv-seek-fill" style={{ width: `${pct}%` }} />
                    <div className="amv-seek-knob" style={{ left: `${pct}%` }} />
                </div>
                <button className="amv-btn" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
                    {muted ? <FiVolumeX /> : <FiVolume2 />}
                </button>
                <button className="amv-btn" onClick={fullscreen} aria-label="Fullscreen">
                    <FiMaximize />
                </button>
            </div>
        </div>
    );
}
