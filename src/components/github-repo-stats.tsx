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

// Assuming these types are the same as before

type Props = {
  repoDetails: RepoDetails;
  statsData: StatsData;
};

export default function GithubRepoStats({ repoDetails, statsData }: Props) {
  const languages = Object.keys(statsData).filter(
    (key) => key !== "header" && key !== "SUM"
  );
  const totalCode = statsData.SUM.code;

  const getLanguagePercentage = (language: string) => {
    return ((statsData[language].code / totalCode) * 100).toFixed(1);
  };

  const getColorForLanguage = (index: number) => {
    const colors = [
      "#FF6384",
      "#36A2EB",
      "#FFCE56",
      "#4BC0C0",
      "#9966FF",
      "#FF9F40",
      "#FF6384",
      "#C9CBCF",
    ];
    return colors[index % colors.length];
  };

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
            {repoDetails.name}
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
            <h3 className="text-lg font-semibold mb-4">Language Details</h3>
            <div className="space-y-3">
              {languages.map((lang, index) => (
                <div key={lang} className="flex items-center justify-between">
                  <div className="flex items-center w-1/3">
                    <div
                      className={`w-3 h-3 rounded-full mr-2`}
                      style={{ backgroundColor: getColorForLanguage(index) }}
                    />
                    <span className="font-medium">{lang}</span>
                  </div>
                  <span className="w-1/5 text-right">
                    {getLanguagePercentage(lang)}%
                  </span>
                  <span className="w-1/5 text-right">
                    {statsData[lang].nFiles} files
                  </span>
                  <span className="w-1/5 text-right">
                    {statsData[lang].code} lines
                  </span>
                </div>
              ))}
            </div>
            <Card className="mt-6">
              <CardHeader className="pb-2">
                <CardTitle>Programming Language Statistics</CardTitle>
                <CardDescription>Lines of Code Distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeStatsGraph codeStats={statsData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
