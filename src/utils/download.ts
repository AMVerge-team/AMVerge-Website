import {
    fetchLatestExtensionRelease,
    fetchLatestRelease,
} from "../services/github";
import { getAdminApiBase } from "./apiBase";

export type DownloadTarget =
    | "windows"
    | "mac"
    | "linux-appimage"
    | "linux-deb"
    | "linux-rpm"
    | "extension";

export const INITIAL_DOWNLOAD_COUNT = 10365;
const DOWNLOAD_COOLDOWN_MS = 30 * 60 * 1000; // 30 minutes
const COOLDOWN_STORAGE_KEY = "amverge_download_cooldown_ts";
const COUNT_STORAGE_KEY = "amverge_download_count_cache";
export const DOWNLOAD_COUNT_EVENT = "amverge:download-count";

const API_BASE = getAdminApiBase();

function readCachedCount(): number {
    try {
        const raw = Number(window.localStorage.getItem(COUNT_STORAGE_KEY));
        if (Number.isFinite(raw) && raw >= INITIAL_DOWNLOAD_COUNT) {
            return Math.floor(raw);
        }
    } catch {
        // ignore storage errors
    }
    return INITIAL_DOWNLOAD_COUNT;
}

function writeCachedCount(count: number): number {
    const safe = Math.max(INITIAL_DOWNLOAD_COUNT, Math.floor(count));
    try {
        window.localStorage.setItem(COUNT_STORAGE_KEY, String(safe));
    } catch {
        // ignore storage errors
    }
    if (typeof window !== "undefined") {
        window.dispatchEvent(
            new CustomEvent<number>(DOWNLOAD_COUNT_EVENT, { detail: safe }),
        );
    }
    return safe;
}

export async function fetchDownloadCount(): Promise<number> {
    const cached = readCachedCount();
    try {
        const res = await fetch(`${API_BASE}/count`, { cache: "no-store" });
        if (res.ok) {
            const data = (await res.json()) as { value?: number };
            if (typeof data.value === "number" && Number.isFinite(data.value)) {
                return writeCachedCount(data.value);
            }
        }
    } catch {
        // fallback to cached/initial count when counter server is offline
    }
    return writeCachedCount(cached);
}

function isOnDownloadCooldown(): boolean {
    try {
        const lastTs = Number(window.localStorage.getItem(COOLDOWN_STORAGE_KEY));
        if (Number.isFinite(lastTs) && lastTs > 0) {
            return Date.now() - lastTs < DOWNLOAD_COOLDOWN_MS;
        }
    } catch {
        // ignore storage errors
    }
    return false;
}

function markDownloadCooldown(): void {
    try {
        window.localStorage.setItem(COOLDOWN_STORAGE_KEY, String(Date.now()));
    } catch {
        // ignore storage errors
    }
}

export async function recordDownloadIncrement(): Promise<number> {
    if (isOnDownloadCooldown()) {
        return readCachedCount();
    }
    markDownloadCooldown();
    try {
        const res = await fetch(`${API_BASE}/increment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
            keepalive: true,
        });
        if (res.ok) {
            const data = (await res.json()) as { value?: number };
            if (typeof data.value === "number" && Number.isFinite(data.value)) {
                return writeCachedCount(data.value);
            }
        }
    } catch {
        // keep optimistic local count when counter server is unreachable
    }
    return writeCachedCount(readCachedCount() + 1);
}

export async function getDownloadUrl(target: DownloadTarget): Promise<string | null> {
    if (target === "extension") {
        const { release, exe, zxp } = await fetchLatestExtensionRelease();
        return (exe ?? zxp)?.browser_download_url ?? release.html_url ?? null;
    }

    const { release, exe, dmg, appImage, deb, rpm } = await fetchLatestRelease();
    if (target === "mac") {
        return dmg?.browser_download_url ?? release.html_url ?? null;
    }
    if (target === "linux-appimage") {
        return appImage?.browser_download_url ?? release.html_url ?? null;
    }
    if (target === "linux-deb") {
        return deb?.browser_download_url ?? release.html_url ?? null;
    }
    if (target === "linux-rpm") {
        return rpm?.browser_download_url ?? release.html_url ?? null;
    }
    return exe?.browser_download_url ?? release.html_url ?? null;
}

export async function downloadTarget(target: DownloadTarget): Promise<boolean> {
    try {
        const url = await getDownloadUrl(target);
        if (!url) return false;
        await Promise.race([
            recordDownloadIncrement(),
            new Promise<void>((resolve) => setTimeout(resolve, 250)),
        ]);
        window.location.href = url;
        return true;
    } catch {
        return false;
    }
}

export async function downloadLatestExe() {
    return downloadTarget("windows");
}
