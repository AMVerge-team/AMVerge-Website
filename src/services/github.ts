const API_BASE = "https://api.github.com/repos/crptk/AMVerge";

function headers(): HeadersInit {
  const token = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

async function ghFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { headers: headers() });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${res.statusText}`);
  return res.json() as Promise<T>;
}

// ── Types ──

export interface GithubAsset {
  name: string;
  browser_download_url: string;
  download_count: number;
}

export interface GithubRelease {
  id: number;
  name: string | null;
  tag_name: string;
  published_at: string;
  body: string | null;
  html_url: string;
  assets?: GithubAsset[];
}

export interface GithubContributor {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

export interface LatestRelease {
  release: GithubRelease;
  exe: GithubAsset | null;
}

// ── API ──

export async function fetchLatestRelease(): Promise<LatestRelease> {
  const release = await ghFetch<GithubRelease>("/releases/latest");
  const exe =
    release.assets?.find(
      (a) => a.name.endsWith(".exe") && !a.name.endsWith(".sig"),
    ) ?? null;
  return { release, exe };
}

export async function fetchReleases(): Promise<GithubRelease[]> {
  return ghFetch<GithubRelease[]>("/releases?per_page=100");
}

export async function fetchContributors(): Promise<GithubContributor[]> {
  return ghFetch<GithubContributor[]>("/contributors?per_page=100");
}

// ── Derived helpers ──

export function cumulativeDownloadCount(releases: GithubRelease[]): number {
  let total = 0;
  for (const release of releases) {
    for (const asset of release.assets ?? []) {
      if (asset.name.endsWith(".exe") && !asset.name.endsWith(".sig")) {
        total += asset.download_count;
      }
    }
  }
  return total;
}
