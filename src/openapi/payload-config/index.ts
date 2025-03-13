import type { OpenAPIV3 } from "openapi-types";
import { SanitizedConfig } from "payload";
import { Options } from "../options";
import { merge } from "../utils";
import { getAuthSchemas } from "./auth-schemas";
import { createAccessRoute } from "./routes/access";
import { getCollectionRoutes } from "./routes/collection";
import { getCustomPaths } from "./routes/custom-paths";
import { getGlobalRoutes } from "./routes/global";
import { createPreferenceRoutes } from "./routes/preferences";

export const analyzePayload = async (
  payloadConfig: SanitizedConfig,
  options: Options,
): Promise<Partial<OpenAPIV3.Document>> => {
  const { paths: preferencePaths, components: preferenceComponents } =
    createPreferenceRoutes(options);
  const { paths: accessPath, components: accessComponents } =
    createAccessRoute(options);

  const collectionDefinitions = await Promise.all(
    payloadConfig.collections
      .filter((collection) => collection.slug !== "payload-preferences")
      .map((collection) =>
        getCollectionRoutes(collection, options, payloadConfig),
      ),
  );
  const globalDefinitions = await Promise.all(
    payloadConfig.globals.map((global) =>
      getGlobalRoutes(global, options, payloadConfig),
    ),
  );

  const { paths: customPaths, components: customComponents } = options.include
    .custom
    ? getCustomPaths(payloadConfig, "payload")
    : { paths: {}, components: {} };

  const paths = merge<OpenAPIV3.PathsObject>(
    {},
    ...collectionDefinitions.map(({ paths }) => paths),
    ...globalDefinitions.map(({ paths }) => paths),
    accessPath,
    preferencePaths,
    customPaths,
  );

  const authSchemas = getAuthSchemas(payloadConfig, options);

  const components = merge<OpenAPIV3.ComponentsObject>(
    authSchemas,
    preferenceComponents,
    accessComponents,
    ...collectionDefinitions.map(({ components }) => components),
    ...globalDefinitions.map(({ components }) => components),
    customComponents,
  );

  return {
    servers: [
      {
        url: `${payloadConfig.serverURL}${payloadConfig.routes.api || "/api"}`,
      },
    ],
    paths,
    components,
  };
};
