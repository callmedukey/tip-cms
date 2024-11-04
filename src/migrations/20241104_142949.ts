import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric,
	"lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"en_alt" varchar,
	"kr_alt" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric
);

CREATE TABLE IF NOT EXISTS "partner_hotels" (
	"id" serial PRIMARY KEY NOT NULL,
	"en_title" varchar NOT NULL,
	"kr_title" varchar NOT NULL,
	"slug" varchar,
	"en_keywords" varchar NOT NULL,
	"kr_keywords" varchar NOT NULL,
	"en_content" jsonb NOT NULL,
	"kr_content" jsonb NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "partner_hotels_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"countries_id" integer,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "partner_hotels_carousel" (
	"id" serial PRIMARY KEY NOT NULL,
	"en_title" varchar NOT NULL,
	"kr_title" varchar NOT NULL,
	"en_subtext" varchar NOT NULL,
	"kr_subtext" varchar NOT NULL,
	"link" varchar NOT NULL,
	"order" numeric NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "partner_hotels_carousel_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "experiences" (
	"id" serial PRIMARY KEY NOT NULL,
	"en_title" varchar NOT NULL,
	"kr_title" varchar NOT NULL,
	"slug" varchar,
	"en_keywords" varchar NOT NULL,
	"kr_keywords" varchar NOT NULL,
	"en_content" jsonb NOT NULL,
	"kr_content" jsonb NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "experiences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"countries_id" integer,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "experiences_top_carousel" (
	"id" serial PRIMARY KEY NOT NULL,
	"en_title" varchar NOT NULL,
	"kr_title" varchar NOT NULL,
	"en_subtext" varchar NOT NULL,
	"kr_subtext" varchar NOT NULL,
	"link" varchar NOT NULL,
	"order" numeric NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "experiences_top_carousel_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "experiences_bottom_carousel" (
	"id" serial PRIMARY KEY NOT NULL,
	"en_title" varchar NOT NULL,
	"kr_title" varchar NOT NULL,
	"en_subtext" varchar NOT NULL,
	"kr_subtext" varchar NOT NULL,
	"link" varchar NOT NULL,
	"order" numeric NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "experiences_bottom_carousel_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"media_id" integer
);

CREATE TABLE IF NOT EXISTS "countries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
);

CREATE TABLE IF NOT EXISTS "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "partner_hotels_rels" ADD CONSTRAINT "partner_hotels_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."partner_hotels"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partner_hotels_rels" ADD CONSTRAINT "partner_hotels_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partner_hotels_rels" ADD CONSTRAINT "partner_hotels_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partner_hotels_carousel_rels" ADD CONSTRAINT "partner_hotels_carousel_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."partner_hotels_carousel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "partner_hotels_carousel_rels" ADD CONSTRAINT "partner_hotels_carousel_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_countries_fk" FOREIGN KEY ("countries_id") REFERENCES "public"."countries"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "experiences_rels" ADD CONSTRAINT "experiences_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "experiences_top_carousel_rels" ADD CONSTRAINT "experiences_top_carousel_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."experiences_top_carousel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "experiences_top_carousel_rels" ADD CONSTRAINT "experiences_top_carousel_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "experiences_bottom_carousel_rels" ADD CONSTRAINT "experiences_bottom_carousel_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."experiences_bottom_carousel"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "experiences_bottom_carousel_rels" ADD CONSTRAINT "experiences_bottom_carousel_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
CREATE UNIQUE INDEX IF NOT EXISTS "partner_hotels_slug_idx" ON "partner_hotels" USING btree ("slug");
CREATE INDEX IF NOT EXISTS "partner_hotels_created_at_idx" ON "partner_hotels" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "partner_hotels_rels_order_idx" ON "partner_hotels_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "partner_hotels_rels_parent_idx" ON "partner_hotels_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "partner_hotels_rels_path_idx" ON "partner_hotels_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "partner_hotels_rels_countries_id_idx" ON "partner_hotels_rels" USING btree ("countries_id");
CREATE INDEX IF NOT EXISTS "partner_hotels_rels_media_id_idx" ON "partner_hotels_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "partner_hotels_carousel_created_at_idx" ON "partner_hotels_carousel" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "partner_hotels_carousel_rels_order_idx" ON "partner_hotels_carousel_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "partner_hotels_carousel_rels_parent_idx" ON "partner_hotels_carousel_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "partner_hotels_carousel_rels_path_idx" ON "partner_hotels_carousel_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "partner_hotels_carousel_rels_media_id_idx" ON "partner_hotels_carousel_rels" USING btree ("media_id");
CREATE UNIQUE INDEX IF NOT EXISTS "experiences_slug_idx" ON "experiences" USING btree ("slug");
CREATE INDEX IF NOT EXISTS "experiences_created_at_idx" ON "experiences" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "experiences_rels_order_idx" ON "experiences_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "experiences_rels_parent_idx" ON "experiences_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "experiences_rels_path_idx" ON "experiences_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "experiences_rels_countries_id_idx" ON "experiences_rels" USING btree ("countries_id");
CREATE INDEX IF NOT EXISTS "experiences_rels_media_id_idx" ON "experiences_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "experiences_top_carousel_created_at_idx" ON "experiences_top_carousel" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "experiences_top_carousel_rels_order_idx" ON "experiences_top_carousel_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "experiences_top_carousel_rels_parent_idx" ON "experiences_top_carousel_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "experiences_top_carousel_rels_path_idx" ON "experiences_top_carousel_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "experiences_top_carousel_rels_media_id_idx" ON "experiences_top_carousel_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "experiences_bottom_carousel_created_at_idx" ON "experiences_bottom_carousel" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "experiences_bottom_carousel_rels_order_idx" ON "experiences_bottom_carousel_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "experiences_bottom_carousel_rels_parent_idx" ON "experiences_bottom_carousel_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "experiences_bottom_carousel_rels_path_idx" ON "experiences_bottom_carousel_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "experiences_bottom_carousel_rels_media_id_idx" ON "experiences_bottom_carousel_rels" USING btree ("media_id");
CREATE INDEX IF NOT EXISTS "countries_created_at_idx" ON "countries" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "users";
DROP TABLE "media";
DROP TABLE "partner_hotels";
DROP TABLE "partner_hotels_rels";
DROP TABLE "partner_hotels_carousel";
DROP TABLE "partner_hotels_carousel_rels";
DROP TABLE "experiences";
DROP TABLE "experiences_rels";
DROP TABLE "experiences_top_carousel";
DROP TABLE "experiences_top_carousel_rels";
DROP TABLE "experiences_bottom_carousel";
DROP TABLE "experiences_bottom_carousel_rels";
DROP TABLE "countries";
DROP TABLE "payload_preferences";
DROP TABLE "payload_preferences_rels";
DROP TABLE "payload_migrations";`);

};
