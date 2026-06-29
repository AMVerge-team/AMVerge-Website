import { fetchLatestRelease } from "../services/github";

export async function downloadLatestExe() {
    try {
        const { exe } = await fetchLatestRelease();
        if (exe?.browser_download_url) {
            window.location.href = exe.browser_download_url;
        }
    } catch {
        // best-effort
    }
}
