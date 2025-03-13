import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { Agents } from "./collections/Agents";
import { Media } from "./collections/Media";
import { Notes } from "./collections/Notes/Notes";
import { NoteTags } from "./collections/Notes/NoteTags";
import { Users } from "./collections/Users";
import { migrations } from "./migrations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Agents, Media, Notes, NoteTags],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || "",
    },
    migrationDir: path.resolve(dirname, "migrations"),
    prodMigrations: migrations,
    push: false,
  }),
  sharp,
  defaultDepth: 1,
  maxDepth: 2,
  plugins: [],
  localization: {
    locales: ["en"],
    defaultLocale: "en",
  },
  serverURL: process.env.SERVER_URL || "http://localhost:3000",
});
