import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const repositories = sqliteTable("repositories", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  nFiles: integer("n_files").notNull(),
  nLines: integer("n_lines").notNull(),
  sumBlank: integer("sum_blank").notNull(),
  sumComment: integer("sum_comment").notNull(),
  sumCode: integer("sum_code").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(cast(unixepoch() as int))`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(cast(unixepoch() as int))`),
});

export const languageStats = sqliteTable("language_stats_v2", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  repoId: integer("repo_id")
    .notNull()
    .references(() => repositories.id),
  language: text("language").notNull(),
  nFiles: integer("n_files").notNull(),
  blank: integer("blank").notNull(),
  comment: integer("comment").notNull(),
  code: integer("code").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(cast(unixepoch() as int))`),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(cast(unixepoch() as int))`),
});
