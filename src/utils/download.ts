import {
    fetchLatestExtensionRelease,
    fetchLatestRelease,
} from "../services/github";

export type DownloadTarget = "windows" | "mac" | "extension";

export async function getDownloadUrl(target: DownloadTarget): Promise<string | null> {
    if (target === "extension") {
        const { release, exe, zxp } = await fetchLatestExtensionRelease();
        return (exe ?? zxp)?.browser_download_url ?? release.html_url ?? null;
    }

    const { release, exe, dmg } = await fetchLatestRelease();
    if (target === "mac") {
        return dmg?.browser_download_url ?? release.html_url ?? null;
    }
    return exe?.browser_download_url ?? release.html_url ?? null;
}

export async function downloadTarget(target: DownloadTarget): Promise<boolean> {
    try {
        const url = await getDownloadUrl(target);
        if (!url) return false;
        window.location.href = url;
        return true;
    } catch {
        return false;
    }
}

export async function downloadLatestExe() {
    return downloadTarget("windows");
}
