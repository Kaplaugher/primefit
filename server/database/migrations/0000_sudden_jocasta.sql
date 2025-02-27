CREATE TABLE "applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"application_id" varchar(10) NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"email" varchar(255) NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
