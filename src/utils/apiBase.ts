const PROD_API_BASE = "https://amverge-admin-panel-production.up.railway.app";
const DEV_API_BASE = "http://localhost:3001";

export function getAdminApiBase(): string {
    const envUrl = (import.meta.env.VITE_ADMIN_API_URL as string | undefined)?.trim();
    if (envUrl) return envUrl.replace(/\/$/, "");

    if (
        typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
            window.location.hostname === "127.0.0.1")
    ) {
        return DEV_API_BASE;
    }
    return PROD_API_BASE;
}
