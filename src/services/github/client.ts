const API_BASE = "https://api.github.com/repos/AMVerge-team/AMVerge";

function headers(): HeadersInit {
  const token = import.meta.env.VITE_GITHUB_TOKEN as string | undefined;
  const h: Record<string, string> = {
    Accept: "application/vnd.github+json",
  };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

export async function ghFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { headers: headers() });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${res.statusText}`);
  return res.json() as Promise<T>;
}

export interface GithubAsset {
  id: number;
  name: string;
  size: number;
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
