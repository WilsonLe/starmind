import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`DROP INDEX IF EXISTS \`users_email_idx\`;`)
  await db.run(sql`ALTER TABLE \`users\` ADD \`username\` text;`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_username_idx\` ON \`users\` (\`username\`);`)
  await db.run(sql`DROP INDEX IF EXISTS \`_users_v_version_version_email_idx\`;`)
  await db.run(sql`ALTER TABLE \`_users_v\` ADD \`version_username\` text;`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_username_idx\` ON \`_users_v\` (\`version_username\`);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX IF EXISTS \`users_username_idx\`;`)
  await db.run(sql`CREATE UNIQUE INDEX \`users_email_idx\` ON \`users\` (\`email\`);`)
  await db.run(sql`ALTER TABLE \`users\` DROP COLUMN \`username\`;`)
  await db.run(sql`DROP INDEX IF EXISTS \`_users_v_version_version_username_idx\`;`)
  await db.run(sql`CREATE INDEX \`_users_v_version_version_email_idx\` ON \`_users_v\` (\`version_email\`);`)
  await db.run(sql`ALTER TABLE \`_users_v\` DROP COLUMN \`version_username\`;`)
}
