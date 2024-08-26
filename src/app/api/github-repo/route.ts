import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const url = req.nextUrl.searchParams.get("url");

  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Invalid or missing URL parameter" });
  }

  try {
    const parsedUrl = new URL(url);
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

    return NextResponse.json({
      name: data.name,
      url: url,
      description: data.description,
      stars: data.stargazers_count,
      forks: data.forks_count,
      openIssues: data.open_issues_count,
    });
  } catch (error) {
    return NextResponse.json({
      error: "Failed to fetch repository data",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
