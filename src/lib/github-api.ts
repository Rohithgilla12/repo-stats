import { RepoDetails, StatsData } from "@/types/repo-stats";
import { analyzeGitRepo } from "@/services/git-analyser-service";

export async function fetchRepoDataAndStats(
  repoUrl: string
): Promise<{ repoDetails: RepoDetails; statsData: StatsData }> {
  // Fetch repository data
  const parsedUrl = new URL(repoUrl);
  const [, owner, repo] = parsedUrl.pathname.split("/");

  if (!owner || !repo) {
    throw new Error("Invalid GitHub repository URL");
  }

  const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(
      `GitHub API responded with ${response.status}: ${response.statusText}`
    );
  }

  const data = await response.json();

  const repoDetails: RepoDetails = {
    name: data.name,
    url: repoUrl,
    description: data.description,
    stars: data.stargazers_count,
    forks: data.forks_count,
    openIssues: data.open_issues_count,
  };

  // Fetch stats data
  const statsData: StatsData = await analyzeGitRepo(repoUrl);

  return { repoDetails, statsData };
}
