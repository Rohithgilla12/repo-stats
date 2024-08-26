import { RepoDetails, StatsData } from "@/types/repo-stats";

export async function fetchRepoData(repoUrl: string): Promise<RepoDetails> {
  console.log("In fetchRepoData", repoUrl);
  const response = await fetch(
    `/api/github-repo?url=${encodeURIComponent(repoUrl)}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch repository data");
  }
  const data = await response.json();
  return {
    name: data.name,
    url: repoUrl,
    description: data.description,
    stars: data.stars,
    forks: data.forks,
    openIssues: data.openIssues,
  };
}

export async function fetchStatsData(repoUrl: string): Promise<StatsData> {
  const response = await fetch(
    `/api/repo-stats?url=${encodeURIComponent(repoUrl)}`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch repository stats");
  }
  const data = await response.json();
  return data.data;
}
