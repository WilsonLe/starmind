import config from "@/payload.config";
import fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { createDocument } from "./openapi";

async function run() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const doc = await createDocument(await config, {
    exclude: { preferences: true },
  });
  await fs.writeFile(
    path.resolve(__dirname, "payload-openapi.json"),
    JSON.stringify(doc, null, 2),
  );
}
run().catch(console.error);
