CREATE TABLE `user_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`selector` text,
	`validator` text,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`avatar_url` text,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_sessions_selector_unique` ON `user_sessions` (`selector`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_sessions_user_id_unique` ON `user_sessions` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);