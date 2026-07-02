import { ghFetch } from "./client";
import type { GithubContributor } from "./client";

export async function fetchContributors(): Promise<GithubContributor[]> {
  return ghFetch<GithubContributor[]>("/contributors?per_page=100");
}
