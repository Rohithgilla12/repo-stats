export type RepoDetails = {
  name: string;
  url: string;
  description: string;
  stars: number;
  forks: number;
  openIssues: number; // Added this line
};

export type LanguageStats = {
  nFiles: number;
  blank: number;
  comment: number;
  code: number;
};

export type StatsData = {
  header: {
    n_files: number;
    n_lines: number;
  };
  SUM: {
    blank: number;
    comment: number;
    code: number;
    nFiles: number;
  };
  [key: string]: LanguageStats | any;
};
