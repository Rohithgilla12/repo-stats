import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import simpleGit from "simple-git";

async function cloneRepo(url: string, targetPath: string): Promise<void> {
  const git = simpleGit();
  await git.clone(url, targetPath);
}

async function getClocResult(dir: string): Promise<any> {
  //   npx cloc dir
  const cloc = execSync(`cloc ${dir} --json`);

  return JSON.parse(cloc.toString());
}

export async function analyzeGitRepo(url: string): Promise<any> {
  const tempDir = path.join(process.cwd(), `temp_repo_${Math.random()}`);

  await cloneRepo(url, tempDir);
  const cloc = await getClocResult(tempDir);

  //   delete tempDir
  fs.rm(tempDir, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
    }
  });
  return cloc;
}
