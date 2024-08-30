import { db } from "@/db/db";
import { repositories } from "@/db/schema";
import { countRepositories } from "@/lib/github-api";
import { count } from "drizzle-orm";

export async function RepoCounter() {
  const repos = await db.select({ count: count() }).from(repositories);

  return (
    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-2">Repositories Analyzed</h2>
      <p className="text-4xl font-bold">{JSON.stringify(repos, null, 2)}</p>
    </div>
  );
}
