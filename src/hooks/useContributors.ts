import { useEffect, useState } from "react";
import { fetchContributors } from "../services/github";
import type { GithubContributor } from "../services/github";

// Module-level cache so the hero, section, and footer share a single fetch.
let cache: Promise<GithubContributor[]> | null = null;

// The project creator, always listed first whatever the commit counts say.
const PINNED = "crptk";

// Contributors GitHub's list leaves out: lew-is's commits aren't linked to
// the account, and Mark-Shun's are only on V2_BRANCH (GitHub counts main).
// Once they show up there, the duplicate is skipped automatically.
const UNLINKED = ["lew-is", "Mark-Shun"];

function profile(login: string): GithubContributor {
    return {
        login,
        avatar_url: `https://github.com/${login}.png?size=96`,
        html_url: `https://github.com/${login}`,
        contributions: 0,
    };
}

export function loadContributors(): Promise<GithubContributor[]> {
    if (!cache) {
        cache = fetchContributors()
            .catch(() => [] as GithubContributor[])
            .then((fetched) => {
                const list = fetched.filter((c) => !c.login.endsWith("[bot]"));
                const has = (login: string) =>
                    list.some((c) => c.login.toLowerCase() === login.toLowerCase());
                for (const login of [PINNED, ...UNLINKED]) {
                    if (!has(login)) list.push(profile(login));
                }
                const isPinned = (c: GithubContributor) => c.login.toLowerCase() === PINNED;
                return list.sort(
                    (a, b) => Number(isPinned(b)) - Number(isPinned(a)) || b.contributions - a.contributions,
                );
            });
    }
    return cache;
}

// null = still loading, [] = loaded but empty/failed.
export function useContributors(): GithubContributor[] | null {
    const [list, setList] = useState<GithubContributor[] | null>(null);

    useEffect(() => {
        let active = true;
        loadContributors().then((l) => {
            if (active) setList(l);
        });
        return () => {
            active = false;
        };
    }, []);

    return list;
}
