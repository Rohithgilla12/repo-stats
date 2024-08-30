/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RepoDetails, StatsData } from "@/types/repo-stats";
import { BookOpen, GitForkIcon, StarIcon } from "lucide-react";
import { CodeStatsGraph } from "./code-stats-graph";
import { LanguageDetailsTable } from "./language-details-table";

type Props = {
  repoDetails: RepoDetails;
  statsData: StatsData;
};

function splitGitHubUrl(url: string) {
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (match) {
    const owner = match[1];
    const repo = match[2];
    return { owner, repo };
  } else {
    return { owner: "", repo: "" };
  }
}

export default function GithubRepoStats({ repoDetails, statsData }: Props) {
  const { owner, repo } = splitGitHubUrl(repoDetails.url);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          <a
            href={repoDetails.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            <span className="flex items-center">
              <img
                src={`https://github.com/${owner}.png?size=40`}
                alt={`${owner} avatar`}
                className="w-6 h-6 mr-2 rounded-full"
              />
              {owner} / {repo}
            </span>
          </a>
        </CardTitle>
        <CardDescription>{repoDetails.description}</CardDescription>
        <div className="flex space-x-4 mt-2">
          <div className="flex items-center">
            <StarIcon className="w-4 h-4 mr-1" />
            <span>{repoDetails.stars}</span>
          </div>
          <div className="flex items-center">
            <GitForkIcon className="w-4 h-4 mr-1" />
            <span>{repoDetails.forks}</span>
          </div>
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1" />
            <span>{repoDetails.openIssues}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="bg-muted p-2 rounded">
              <div className="text-2xl font-bold">
                {statsData.header.n_files}
              </div>
              <div className="text-sm text-muted-foreground">Files</div>
            </div>
            <div className="bg-muted p-2 rounded">
              <div className="text-2xl font-bold">
                {statsData.header.n_lines}
              </div>
              <div className="text-sm text-muted-foreground">Total Lines</div>
            </div>
            <div className="bg-muted p-2 rounded">
              <div className="text-2xl font-bold">{statsData.SUM.blank}</div>
              <div className="text-sm text-muted-foreground">Blank Lines</div>
            </div>
            <div className="bg-muted p-2 rounded">
              <div className="text-2xl font-bold">{statsData.SUM.code}</div>
              <div className="text-sm text-muted-foreground">Lines of Code</div>
            </div>
          </div>

          <div>
            <LanguageDetailsTable statsData={statsData} />
            <div className="mt-6">
              <CodeStatsGraph codeStats={statsData} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
