import { useEffect, useState } from "react";
import { fetchContributors } from "../services/github";
import type { GithubContributor } from "../services/github";

// Module-level cache so the hero, section, and footer share a single fetch.
let cache: Promise<GithubContributor[]> | null = null;

const EXCLUDED_LOGINS = new Set(["0xkhaosoccured"]);

export function loadContributors(): Promise<GithubContributor[]> {
    if (!cache) {
        cache = fetchContributors()
            .catch(() => [] as GithubContributor[])
            .then((fetched) =>
                fetched
                    .filter(
                        (c) =>
                            !c.login.endsWith("[bot]") &&
                            !EXCLUDED_LOGINS.has(c.login.toLowerCase()),
                    )
                    .sort((a, b) => b.contributions - a.contributions),
            );
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
