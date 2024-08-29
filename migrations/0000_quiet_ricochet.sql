CREATE TABLE `language_stats` (
	`repo_name` text PRIMARY KEY NOT NULL,
	`language` text NOT NULL,
	`n_files` integer NOT NULL,
	`blank` integer NOT NULL,
	`comment` integer NOT NULL,
	`code` integer NOT NULL,
	`created_at` integer DEFAULT '"2024-08-29T15:19:51.216Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2024-08-29T15:19:51.216Z"' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `stats_data` (
	`repo_name` text PRIMARY KEY NOT NULL,
	`n_files` integer NOT NULL,
	`n_lines` integer NOT NULL,
	`sum_blank` integer NOT NULL,
	`sum_comment` integer NOT NULL,
	`sum_code` integer NOT NULL,
	`sum_n_files` integer NOT NULL,
	`created_at` integer DEFAULT '"2024-08-29T15:19:51.216Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2024-08-29T15:19:51.216Z"' NOT NULL
);
