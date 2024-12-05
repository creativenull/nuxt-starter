CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`pubid` text NOT NULL,
	`first_name` text,
	`last_name` text,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`emailVerifiedOn` text,
	`createdOn` integer NOT NULL,
	`updatedOn` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_pubid_unique` ON `users` (`pubid`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);