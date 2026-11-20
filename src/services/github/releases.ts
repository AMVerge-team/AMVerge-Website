import { ghFetch } from "./client";
import type { GithubAsset, GithubRelease } from "./client";

const EXTENSION_REPO = "AMVerge-team/AMVerge-Extension";

export interface LatestRelease {
  release: GithubRelease;
  exe: GithubAsset | null;
  dmg: GithubAsset | null;
  appImage: GithubAsset | null;
  deb: GithubAsset | null;
  rpm: GithubAsset | null;
}

export interface LatestExtensionRelease {
  release: GithubRelease;
  exe: GithubAsset | null;
  zxp: GithubAsset | null;
}

let latestAppPromise: Promise<LatestRelease> | null = null;
let latestExtensionPromise: Promise<LatestExtensionRelease> | null = null;

export function fetchLatestRelease(): Promise<LatestRelease> {
  if (!latestAppPromise) {
    latestAppPromise = ghFetch<GithubRelease>("/releases/latest")
      .then((release) => {
        const assets = release.assets ?? [];
        const exe =
          assets.find(
            (a) => a.name.endsWith(".exe") && !a.name.endsWith(".sig"),
          ) ?? null;
        const dmg =
          assets.find(
            (a) =>
              a.name.toLowerCase().includes("universal") &&
              a.name.endsWith(".dmg") &&
              !a.name.endsWith(".sig"),
          ) ??
          assets.find(
            (a) => a.name.endsWith(".dmg") && !a.name.endsWith(".sig"),
          ) ??
          null;
        const appImage =
          assets.find(
            (a) =>
              a.name.endsWith(".AppImage") &&
              !a.name.endsWith(".sig") &&
              !a.name.startsWith("linux-x86_64-"),
          ) ??
          assets.find(
            (a) => a.name.endsWith(".AppImage") && !a.name.endsWith(".sig"),
          ) ??
          null;
        const deb =
          assets.find(
            (a) => a.name.endsWith(".deb") && !a.name.endsWith(".sig"),
          ) ?? null;
        const rpm =
          assets.find(
            (a) => a.name.endsWith(".rpm") && !a.name.endsWith(".sig"),
          ) ?? null;
        return { release, exe, dmg, appImage, deb, rpm };
      })
      .catch((err) => {
        latestAppPromise = null;
        throw err;
      });
  }
  return latestAppPromise;
}

export function fetchLatestExtensionRelease(): Promise<LatestExtensionRelease> {
  if (!latestExtensionPromise) {
    latestExtensionPromise = ghFetch<GithubRelease>(
      "/releases/latest",
      EXTENSION_REPO,
    )
      .then((release) => {
        const assets = release.assets ?? [];
        const exe =
          assets.find((a) => /^amvergesetup\.exe$/i.test(a.name)) ??
          assets.find(
            (a) => a.name.endsWith(".exe") && !a.name.endsWith(".sig"),
          ) ??
          null;
        const zxp =
          assets.find((a) => /^amverge\.zxp$/i.test(a.name)) ??
          assets.find((a) => a.name.endsWith(".zxp")) ??
          null;
        return { release, exe, zxp };
      })
      .catch((err) => {
        latestExtensionPromise = null;
        throw err;
      });
  }
  return latestExtensionPromise;
}

export async function fetchReleases(): Promise<GithubRelease[]> {
  return ghFetch<GithubRelease[]>("/releases?per_page=100");
}

export async function fetchReleaseByTag(tag: string): Promise<GithubRelease> {
  return ghFetch<GithubRelease>(`/releases/tags/${tag}`);
}

const SHARED_CHANGELOG_RAW_BASE =
  "https://raw.githubusercontent.com/AMVerge-team/AMVerge/main";

export async function fetchSharedChangelogNotes(tag: string): Promise<string | null> {
  try {
    const res = await fetch(
      `${SHARED_CHANGELOG_RAW_BASE}/updates/${encodeURIComponent(tag)}.md`,
    );
    if (!res.ok) return null;
    const text = (await res.text()).trim();
    return text || null;
  } catch {
    return null;
  }
}

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
