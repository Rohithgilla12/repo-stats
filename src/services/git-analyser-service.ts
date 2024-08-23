import { exec, execSync } from "child_process";
import simpleGit from "simple-git";
import { promisify } from "util";
import fs from "fs";
import path from "path";

const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);

async function cloneRepo(url: string, targetPath: string): Promise<void> {
  const git = simpleGit();
  await git.clone(url, targetPath);
}

async function getFilesRecursively(dir: string): Promise<string[]> {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFilesRecursively(res) : res;
    })
  );
  return Array.prototype.concat(...files);
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
