"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GithubRepoStats from "@/components/github-repo-stats";
import { Skeleton } from "@/components/ui/skeleton";
import { RepoDetails, StatsData } from "@/types/repo-stats";

export default function StatsPage() {
  const searchParams = useSearchParams();
  const repoUrl = searchParams.get("url");
  const [repoData, setRepoData] = useState<RepoDetails | null>(null);
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (repoUrl) {
      fetchData();
    }
  }, [repoUrl]);

  const fetchData = async () => {
    try {
      const [repoResponse, statsResponse] = await Promise.all([
        fetch(`/api/github-repo?url=${encodeURIComponent(repoUrl!)}`),
        fetch(`/api/repo-stats?url=${encodeURIComponent(repoUrl!)}`),
      ]);

      if (!repoResponse.ok || !statsResponse.ok) {
        throw new Error("Failed to fetch repository data");
      }

      const repoData = await repoResponse.json();
      const statsData = await statsResponse.json();

      setRepoData({
        name: repoData.name,
        url: repoUrl,
        description: repoData.description,
        stars: repoData.stars,
        forks: repoData.forks,
        openIssues: repoData.openIssues,
      });

      setStatsData(statsData.data);
      setLoading(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      setLoading(false);
    }
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!repoData || !statsData) {
    return <div className="text-center">No repository data available.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <GithubRepoStats repoDetails={repoData} statsData={statsData} />
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="container mx-auto p-4">
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex space-x-4">
          <Skeleton className="h-12 w-20" />
          <Skeleton className="h-12 w-20" />
          <Skeleton className="h-12 w-20" />
        </div>
      </div>
    </div>
  );
}
