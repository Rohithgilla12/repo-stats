import { RepoDetails, StatsData } from "@/types/repo-stats";
import { analyzeGitRepo } from "@/services/git-analyser-service";
import { db } from "@/db/db";
import { languageStats, repositories } from "@/db/schema";
import { eq } from "drizzle-orm";

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

  // Check if the stats data is existing in database
  const existingStats = await db
    .select({
      id: repositories.id,
      name: repositories.name,
      nFiles: repositories.nFiles,
      nLines: repositories.nLines,
      sumBlank: repositories.sumBlank,
      sumComment: repositories.sumComment,
      sumCode: repositories.sumCode,
      createdAt: repositories.createdAt,
      updatedAt: repositories.updatedAt,
      languages: {
        language: languageStats.language,
        nFiles: languageStats.nFiles,
        blank: languageStats.blank,
        comment: languageStats.comment,
        code: languageStats.code,
      },
    })
    .from(repositories)
    .leftJoin(languageStats, eq(repositories.id, languageStats.repoId))
    .where(eq(repositories.name, repoUrl));

  const languages = existingStats.reduce((acc, stat) => {
    if (stat.languages?.language) {
      acc[stat.languages.language] = {
        nFiles: stat.languages.nFiles ?? 0,
        blank: stat.languages?.blank ?? 0,
        comment: stat.languages?.comment ?? 0,
        code: stat.languages?.code ?? 0,
      };
    }
    return acc;
  }, {} as Record<string, { nFiles: number; blank: number; comment: number; code: number }>);

  if (existingStats.length > 0) {
    const stat = existingStats[0];
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    if (stat.updatedAt && stat.updatedAt > oneDayAgo) {
      return {
        repoDetails,
        statsData: {
          header: {
            n_files: stat.nFiles,
            n_lines: stat.nLines,
          },
          SUM: {
            blank: stat.sumBlank,
            comment: stat.sumComment,
            code: stat.sumCode,
            nFiles: stat.nFiles,
          },
          ...languages,
        },
      };
    }
  }

  // Fetch new stats data
  const stats: StatsData = await analyzeGitRepo(repoUrl);

  // Update or insert stats data into database
  const result = await db
    .insert(repositories)
    .values({
      name: repoUrl,
      nFiles: stats.header.n_files,
      nLines: stats.header.n_lines,
      sumBlank: stats.SUM.blank,
      sumComment: stats.SUM.comment,
      sumCode: stats.SUM.code,
    })
    .onConflictDoUpdate({
      target: repositories.name,
      set: {
        nFiles: stats.header.n_files,
        nLines: stats.header.n_lines,
        sumBlank: stats.SUM.blank,
        sumComment: stats.SUM.comment,
        sumCode: stats.SUM.code,
        updatedAt: new Date(),
      },
    })
    .returning({ insertedId: repositories.id });

  const repoId = result[0].insertedId;

  // Delete existing language stats and insert new ones
  await db.delete(languageStats).where(eq(languageStats.repoId, repoId));

  for (const [language, stat] of Object.entries(stats)) {
    if (language !== "SUM" && language !== "header") {
      await db.insert(languageStats).values({
        repoId,
        language,
        ...stat,
      });
    }
  }

  return { repoDetails, statsData: stats };
}
