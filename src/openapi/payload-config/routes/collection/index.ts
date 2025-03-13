import type { OpenAPIV3 } from "openapi-types";
import { SanitizedCollectionConfig, SanitizedConfig } from "payload";
import { Options } from "../../../options";
import { merge } from "../../../utils";
import { getCustomPaths } from "../custom-paths";
import { createVersionRoutes } from "../version-paths";
import { getAuthRoutes } from "./auth";
import { getBulkRoutes } from "./bulk-routes";
import { getMainRoutes } from "./main-routes";

export const getCollectionRoutes = async (
  collection: SanitizedCollectionConfig,
  options: Options,
  payloadConfig: SanitizedConfig,
): Promise<Pick<Required<OpenAPIV3.Document>, "paths" | "components">> => {
  const mainRoutes = await getMainRoutes(collection, options, payloadConfig);
  const versionRoutes = await createVersionRoutes(
    collection,
    options,
    payloadConfig,
  );
  const bulkRoutes = await getBulkRoutes(collection, options);

  const authRoutes = getAuthRoutes(collection, options);
  const customRoutes = getCustomPaths(collection, "collection");

  return merge<Pick<Required<OpenAPIV3.Document>, "paths" | "components">>(
    mainRoutes,
    versionRoutes,
    bulkRoutes,
    authRoutes,
    customRoutes,
  );
};
