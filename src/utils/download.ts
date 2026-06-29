// Redirects to the latest .exe asset from the AMVerge GitHub releases.
export async function downloadLatestExe() {
    try {
        const res = await fetch(
            "https://api.github.com/repos/crptk/AMVerge/releases/latest",
        );
        if (!res.ok) return;
        const data = await res.json();
        const exe = data.assets?.find(
            (a: { name: string }) =>
                a.name.endsWith(".exe") && !a.name.endsWith(".sig"),
        );
        if (exe) window.location.href = exe.browser_download_url;
    } catch {
        // ignore, button is best-effort
    }
}
