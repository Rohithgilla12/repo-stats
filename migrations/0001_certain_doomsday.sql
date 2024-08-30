CREATE TABLE `language_stats_v2` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`repo_id` integer NOT NULL,
	`language` text NOT NULL,
	`n_files` integer NOT NULL,
	`blank` integer NOT NULL,
	`comment` integer NOT NULL,
	`code` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch() as int)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch() as int)) NOT NULL,
	FOREIGN KEY (`repo_id`) REFERENCES `repositories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `repositories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`n_files` integer NOT NULL,
	`n_lines` integer NOT NULL,
	`sum_blank` integer NOT NULL,
	`sum_comment` integer NOT NULL,
	`sum_code` integer NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch() as int)) NOT NULL,
	`updated_at` integer DEFAULT (cast(unixepoch() as int)) NOT NULL
);
--> statement-breakpoint
DROP TABLE `language_stats`;--> statement-breakpoint
DROP TABLE `stats_data`;--> statement-breakpoint
CREATE UNIQUE INDEX `repositories_name_unique` ON `repositories` (`name`);