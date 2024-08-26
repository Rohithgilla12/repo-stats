import { analyzeGitRepo } from "@/services/git-analyser-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 }
    );
  }

  const response = await analyzeGitRepo(url);

  return NextResponse.json({ data: response });
}
