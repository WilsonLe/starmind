import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`users\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`role\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	\`email\` text,
  	\`reset_password_token\` text,
  	\`reset_password_expiration\` text,
  	\`salt\` text,
  	\`hash\` text,
  	\`login_attempts\` numeric DEFAULT 0,
  	\`lock_until\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`users_updated_at_idx\` ON \`users\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`users_created_at_idx\` ON \`users\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`users__status_idx\` ON \`users\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`CREATE TABLE \`users_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`agents_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`agents_id\`) REFERENCES \`agents\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`users_rels_order_idx\` ON \`users_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`users_rels_parent_idx\` ON \`users_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`users_rels_path_idx\` ON \`users_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`users_rels_users_id_idx\` ON \`users_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`users_rels_agents_id_idx\` ON \`users_rels\` (\`agents_id\`);`)
  await db.run(sql`CREATE TABLE \`_users_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_role\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_email\` text,
  	\`version_reset_password_token\` text,
  	\`version_reset_password_expiration\` text,
  	\`version_salt\` text,
  	\`version_hash\` text,
  	\`version_login_attempts\` numeric DEFAULT 0,
  	\`version_lock_until\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_users_v_parent_idx\` ON \`_users_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_updated_at_idx\` ON \`_users_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_created_at_idx\` ON \`_users_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version__status_idx\` ON \`_users_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_email_idx\` ON \`_users_v\` (\`version_email\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_created_at_idx\` ON \`_users_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_updated_at_idx\` ON \`_users_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_latest_idx\` ON \`_users_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_users_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`agents_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_users_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`agents_id\`) REFERENCES \`agents\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_users_v_rels_order_idx\` ON \`_users_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_rels_parent_idx\` ON \`_users_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_rels_path_idx\` ON \`_users_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_rels_users_id_idx\` ON \`_users_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`_users_v_rels_agents_id_idx\` ON \`_users_v_rels\` (\`agents_id\`);`)
  await db.run(sql`CREATE TABLE \`agents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	\`enable_a_p_i_key\` integer,
  	\`api_key\` text,
  	\`api_key_index\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`agents_updated_at_idx\` ON \`agents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`agents_created_at_idx\` ON \`agents\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`agents__status_idx\` ON \`agents\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`agents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`agents_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`agents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`agents_id\`) REFERENCES \`agents\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`agents_rels_order_idx\` ON \`agents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`agents_rels_parent_idx\` ON \`agents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`agents_rels_path_idx\` ON \`agents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`agents_rels_users_id_idx\` ON \`agents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`agents_rels_agents_id_idx\` ON \`agents_rels\` (\`agents_id\`);`)
  await db.run(sql`CREATE TABLE \`_agents_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_enable_a_p_i_key\` integer,
  	\`version_api_key\` text,
  	\`version_api_key_index\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`agents\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_agents_v_parent_idx\` ON \`_agents_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_agents_v_version_version_updated_at_idx\` ON \`_agents_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_agents_v_version_version_created_at_idx\` ON \`_agents_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_agents_v_version_version__status_idx\` ON \`_agents_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_agents_v_created_at_idx\` ON \`_agents_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_agents_v_updated_at_idx\` ON \`_agents_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_agents_v_latest_idx\` ON \`_agents_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_agents_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`agents_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_agents_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`agents_id\`) REFERENCES \`agents\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_agents_v_rels_order_idx\` ON \`_agents_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_agents_v_rels_parent_idx\` ON \`_agents_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_agents_v_rels_path_idx\` ON \`_agents_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_agents_v_rels_users_id_idx\` ON \`_agents_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`_agents_v_rels_agents_id_idx\` ON \`_agents_v_rels\` (\`agents_id\`);`)
  await db.run(sql`CREATE TABLE \`media\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`alt\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	\`url\` text,
  	\`thumbnail_u_r_l\` text,
  	\`filename\` text,
  	\`mime_type\` text,
  	\`filesize\` numeric,
  	\`width\` numeric,
  	\`height\` numeric,
  	\`focal_x\` numeric,
  	\`focal_y\` numeric
  );
  `)
  await db.run(sql`CREATE INDEX \`media_updated_at_idx\` ON \`media\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`media_created_at_idx\` ON \`media\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`media__status_idx\` ON \`media\` (\`_status\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`media_filename_idx\` ON \`media\` (\`filename\`);`)
  await db.run(sql`CREATE TABLE \`media_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`agents_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`agents_id\`) REFERENCES \`agents\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`media_rels_order_idx\` ON \`media_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`media_rels_parent_idx\` ON \`media_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`media_rels_path_idx\` ON \`media_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`media_rels_users_id_idx\` ON \`media_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`media_rels_agents_id_idx\` ON \`media_rels\` (\`agents_id\`);`)
  await db.run(sql`CREATE TABLE \`_media_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_alt\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_url\` text,
  	\`version_thumbnail_u_r_l\` text,
  	\`version_filename\` text,
  	\`version_mime_type\` text,
  	\`version_filesize\` numeric,
  	\`version_width\` numeric,
  	\`version_height\` numeric,
  	\`version_focal_x\` numeric,
  	\`version_focal_y\` numeric,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_media_v_parent_idx\` ON \`_media_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_updated_at_idx\` ON \`_media_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_created_at_idx\` ON \`_media_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version__status_idx\` ON \`_media_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_version_version_filename_idx\` ON \`_media_v\` (\`version_filename\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_created_at_idx\` ON \`_media_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_updated_at_idx\` ON \`_media_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_latest_idx\` ON \`_media_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_media_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`agents_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_media_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`agents_id\`) REFERENCES \`agents\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_media_v_rels_order_idx\` ON \`_media_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_rels_parent_idx\` ON \`_media_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_rels_path_idx\` ON \`_media_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_rels_users_id_idx\` ON \`_media_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`_media_v_rels_agents_id_idx\` ON \`_media_v_rels\` (\`agents_id\`);`)
  await db.run(sql`CREATE TABLE \`notes\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`content\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`CREATE INDEX \`notes_updated_at_idx\` ON \`notes\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`notes_created_at_idx\` ON \`notes\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`notes__status_idx\` ON \`notes\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`notes_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`note_tags_id\` integer,
  	\`users_id\` integer,
  	\`agents_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`notes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`note_tags_id\`) REFERENCES \`note_tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`agents_id\`) REFERENCES \`agents\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`notes_rels_order_idx\` ON \`notes_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`notes_rels_parent_idx\` ON \`notes_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`notes_rels_path_idx\` ON \`notes_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`notes_rels_note_tags_id_idx\` ON \`notes_rels\` (\`note_tags_id\`);`)
  await db.run(sql`CREATE INDEX \`notes_rels_users_id_idx\` ON \`notes_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`notes_rels_agents_id_idx\` ON \`notes_rels\` (\`agents_id\`);`)
  await db.run(sql`CREATE TABLE \`_notes_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_content\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`notes\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_notes_v_parent_idx\` ON \`_notes_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_notes_v_version_version_updated_at_idx\` ON \`_notes_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_notes_v_version_version_created_at_idx\` ON \`_notes_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_notes_v_version_version__status_idx\` ON \`_notes_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_notes_v_created_at_idx\` ON \`_notes_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_notes_v_updated_at_idx\` ON \`_notes_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_notes_v_latest_idx\` ON \`_notes_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_notes_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`note_tags_id\` integer,
  	\`users_id\` integer,
  	\`agents_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_notes_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`note_tags_id\`) REFERENCES \`note_tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`agents_id\`) REFERENCES \`agents\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_notes_v_rels_order_idx\` ON \`_notes_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_notes_v_rels_parent_idx\` ON \`_notes_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_notes_v_rels_path_idx\` ON \`_notes_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_notes_v_rels_note_tags_id_idx\` ON \`_notes_v_rels\` (\`note_tags_id\`);`)
  await db.run(sql`CREATE INDEX \`_notes_v_rels_users_id_idx\` ON \`_notes_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`_notes_v_rels_agents_id_idx\` ON \`_notes_v_rels\` (\`agents_id\`);`)
  await db.run(sql`CREATE TABLE \`note_tags\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`slug\` text,
  	\`display_name\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft'
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX \`note_tags_slug_idx\` ON \`note_tags\` (\`slug\`);`)
  await db.run(sql`CREATE UNIQUE INDEX \`note_tags_display_name_idx\` ON \`note_tags\` (\`display_name\`);`)
  await db.run(sql`CREATE INDEX \`note_tags_updated_at_idx\` ON \`note_tags\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`note_tags_created_at_idx\` ON \`note_tags\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`note_tags__status_idx\` ON \`note_tags\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`note_tags_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`agents_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`note_tags\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`agents_id\`) REFERENCES \`agents\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`note_tags_rels_order_idx\` ON \`note_tags_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`note_tags_rels_parent_idx\` ON \`note_tags_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`note_tags_rels_path_idx\` ON \`note_tags_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`note_tags_rels_users_id_idx\` ON \`note_tags_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`note_tags_rels_agents_id_idx\` ON \`note_tags_rels\` (\`agents_id\`);`)
  await db.run(sql`CREATE TABLE \`_note_tags_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_slug\` text,
  	\`version_display_name\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`note_tags\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX \`_note_tags_v_parent_idx\` ON \`_note_tags_v\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_note_tags_v_version_version_slug_idx\` ON \`_note_tags_v\` (\`version_slug\`);`)
  await db.run(sql`CREATE INDEX \`_note_tags_v_version_version_display_name_idx\` ON \`_note_tags_v\` (\`version_display_name\`);`)
  await db.run(sql`CREATE INDEX \`_note_tags_v_version_version_updated_at_idx\` ON \`_note_tags_v\` (\`version_updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_note_tags_v_version_version_created_at_idx\` ON \`_note_tags_v\` (\`version_created_at\`);`)
  await db.run(sql`CREATE INDEX \`_note_tags_v_version_version__status_idx\` ON \`_note_tags_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_note_tags_v_created_at_idx\` ON \`_note_tags_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_note_tags_v_updated_at_idx\` ON \`_note_tags_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_note_tags_v_latest_idx\` ON \`_note_tags_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`_note_tags_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`agents_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_note_tags_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`agents_id\`) REFERENCES \`agents\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`_note_tags_v_rels_order_idx\` ON \`_note_tags_v_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`_note_tags_v_rels_parent_idx\` ON \`_note_tags_v_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`_note_tags_v_rels_path_idx\` ON \`_note_tags_v_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`_note_tags_v_rels_users_id_idx\` ON \`_note_tags_v_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`_note_tags_v_rels_agents_id_idx\` ON \`_note_tags_v_rels\` (\`agents_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`global_slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_global_slug_idx\` ON \`payload_locked_documents\` (\`global_slug\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_updated_at_idx\` ON \`payload_locked_documents\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_created_at_idx\` ON \`payload_locked_documents\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`agents_id\` integer,
  	\`media_id\` integer,
  	\`notes_id\` integer,
  	\`note_tags_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`agents_id\`) REFERENCES \`agents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`notes_id\`) REFERENCES \`notes\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`note_tags_id\`) REFERENCES \`note_tags\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_agents_id_idx\` ON \`payload_locked_documents_rels\` (\`agents_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_notes_id_idx\` ON \`payload_locked_documents_rels\` (\`notes_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_locked_documents_rels_note_tags_id_idx\` ON \`payload_locked_documents_rels\` (\`note_tags_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text,
  	\`value\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_key_idx\` ON \`payload_preferences\` (\`key\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_updated_at_idx\` ON \`payload_preferences\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_created_at_idx\` ON \`payload_preferences\` (\`created_at\`);`)
  await db.run(sql`CREATE TABLE \`payload_preferences_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`agents_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_preferences\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`agents_id\`) REFERENCES \`agents\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_order_idx\` ON \`payload_preferences_rels\` (\`order\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_parent_idx\` ON \`payload_preferences_rels\` (\`parent_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_path_idx\` ON \`payload_preferences_rels\` (\`path\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_users_id_idx\` ON \`payload_preferences_rels\` (\`users_id\`);`)
  await db.run(sql`CREATE INDEX \`payload_preferences_rels_agents_id_idx\` ON \`payload_preferences_rels\` (\`agents_id\`);`)
  await db.run(sql`CREATE TABLE \`payload_migrations\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`name\` text,
  	\`batch\` numeric,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(sql`CREATE INDEX \`payload_migrations_updated_at_idx\` ON \`payload_migrations\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`payload_migrations_created_at_idx\` ON \`payload_migrations\` (\`created_at\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`users\`;`)
  await db.run(sql`DROP TABLE \`users_rels\`;`)
  await db.run(sql`DROP TABLE \`_users_v\`;`)
  await db.run(sql`DROP TABLE \`_users_v_rels\`;`)
  await db.run(sql`DROP TABLE \`agents\`;`)
  await db.run(sql`DROP TABLE \`agents_rels\`;`)
  await db.run(sql`DROP TABLE \`_agents_v\`;`)
  await db.run(sql`DROP TABLE \`_agents_v_rels\`;`)
  await db.run(sql`DROP TABLE \`media\`;`)
  await db.run(sql`DROP TABLE \`media_rels\`;`)
  await db.run(sql`DROP TABLE \`_media_v\`;`)
  await db.run(sql`DROP TABLE \`_media_v_rels\`;`)
  await db.run(sql`DROP TABLE \`notes\`;`)
  await db.run(sql`DROP TABLE \`notes_rels\`;`)
  await db.run(sql`DROP TABLE \`_notes_v\`;`)
  await db.run(sql`DROP TABLE \`_notes_v_rels\`;`)
  await db.run(sql`DROP TABLE \`note_tags\`;`)
  await db.run(sql`DROP TABLE \`note_tags_rels\`;`)
  await db.run(sql`DROP TABLE \`_note_tags_v\`;`)
  await db.run(sql`DROP TABLE \`_note_tags_v_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents\`;`)
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences\`;`)
  await db.run(sql`DROP TABLE \`payload_preferences_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_migrations\`;`)
}
