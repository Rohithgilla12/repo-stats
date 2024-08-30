import { Suspense } from "react";
import GithubRepoStats from "@/components/github-repo-stats";
import { SkeletonLoader } from "@/components/skeleton-loader";
import { fetchRepoDataAndStats } from "@/lib/github-api";

export default async function StatsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const repoUrl = searchParams.url as string | undefined;

  if (!repoUrl) {
    return <div className="text-center">No repository URL provided.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<SkeletonLoader />}>
        <StatsContent repoUrl={repoUrl} />
      </Suspense>
    </div>
  );
}

async function StatsContent({ repoUrl }: { repoUrl: string }) {
  try {
    const { repoDetails, statsData } = await fetchRepoDataAndStats(repoUrl);

    return <GithubRepoStats repoDetails={repoDetails} statsData={statsData} />;
  } catch (error) {
    return (
      <div className="text-center text-red-500">
        {error instanceof Error ? error.message : "An unknown error occurred"}
      </div>
    );
  }
}
