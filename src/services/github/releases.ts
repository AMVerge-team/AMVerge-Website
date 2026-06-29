import { ghFetch } from "./client";
import type { GithubAsset, GithubRelease } from "./client";

export interface LatestRelease {
  release: GithubRelease;
  exe: GithubAsset | null;
}

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
