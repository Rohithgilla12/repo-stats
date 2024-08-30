/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RepoCounter } from "@/components/RepoCounter";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [repoUrl, setRepoUrl] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (repoUrl) {
      router.push(`/stats?url=${encodeURIComponent(repoUrl)}`);
    }
  };

  const featuredRepos = [
    {
      name: "Terminal",
      url: "https://github.com/terminaldotshop/terminal",
      description: "Terminal.shop - Open-source e-commerce platform",
      owner: "terminaldotshop",
    },
    {
      name: "Cal.com",
      url: "https://github.com/calcom/cal.com",
      description: "Scheduling infrastructure for absolutely everyone",
      owner: "calcom",
    },
    {
      name: "Create T3 App",
      url: "https://github.com/t3-oss/create-t3-app",
      description: "The best way to start a full-stack, typesafe Next.js app",
      owner: "t3-oss",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Repo Stats</h1>
        <p className="text-xl mb-6">
          Unlock insights from your GitHub repositories with ease!
        </p>
        <ul className="text-left list-disc list-inside mb-6">
          <li>Analyze code language distribution</li>
          <li>Geek out on graphs and charts</li>
          <li>Number of files by language</li>
          <li>Top 5 Languages by number of files</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 mb-8">
        <Input
          type="text"
          placeholder="Enter GitHub repository URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
        <Button type="submit" className="w-full">
          View Repository Stats
        </Button>
      </form>

      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Featured Repositories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredRepos.map((repo) => (
            <Card key={repo.name} className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <img
                    src={`https://github.com/${repo.owner}.png?size=40`}
                    alt={`${repo.owner} avatar`}
                    className="w-6 h-6 mr-2 rounded-full"
                  />
                  {repo.name}
                </CardTitle>
                <CardDescription>{repo.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link href={`/stats?url=${encodeURIComponent(repo.url)}`}>
                    View Stats <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
