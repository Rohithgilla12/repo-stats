import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// LanguageStats table
export const languageStats = sqliteTable("language_stats", {
  repoName: text("repo_name").primaryKey(),
  language: text("language").notNull(),
  nFiles: integer("n_files").notNull(),
  blank: integer("blank").notNull(),
  comment: integer("comment").notNull(),
  code: integer("code").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
});

// StatsData table
export const statsData = sqliteTable("stats_data", {
  repoName: text("repo_name").primaryKey(),
  nFiles: integer("n_files").notNull(),
  nLines: integer("n_lines").notNull(),
  sumBlank: integer("sum_blank").notNull(),
  sumComment: integer("sum_comment").notNull(),
  sumCode: integer("sum_code").notNull(),
  sumNFiles: integer("sum_n_files").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(new Date()),
});
