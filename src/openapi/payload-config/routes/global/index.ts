import type { OpenAPIV3 } from "openapi-types";
import { SanitizedConfig, SanitizedGlobalConfig } from "payload";
import { basicParameters } from "../../../base-config";
import { Options } from "../../../options";
import {
  createRef,
  createRequestBody,
  createResponse,
  createUpsertConfirmationSchema,
  entityToSchema,
} from "../../../schemas";
import { getSingular, getSingularSchemaName, merge } from "../../../utils";
import { getRouteAccess } from "../../route-access";
import { getCustomPaths } from "../custom-paths";
import { createVersionRoutes } from "../version-paths";

export const getGlobalRoutes = async (
  global: SanitizedGlobalConfig,
  options: Options,
  payloadConfig: SanitizedConfig,
): Promise<Pick<Required<OpenAPIV3.Document>, "paths" | "components">> => {
  const singleItem = getSingular(global);
  const schemaName = getSingularSchemaName(global);

  const paths: OpenAPIV3.PathsObject = {
    [`/globals/${global.slug}`]: {
      get: {
        summary: `Get the ${singleItem}`,
        description: `Get the ${singleItem}`,
        tags: [`global ${global.slug}`],
        security: await getRouteAccess(global, "read", options.access),
        parameters: basicParameters,
        responses: {
          "200": createRef(schemaName, "responses"),
        },
      },
      post: {
        summary: `Updates the ${singleItem}`,
        description: `Updates the ${singleItem}`,
        tags: [`global ${global.slug}`],
        security: await getRouteAccess(global, "update", options.access),
        parameters: basicParameters,
        requestBody: createRef(schemaName, "requestBodies"),
        responses: {
          "200": createRef(`${schemaName}UpsertConfirmation`, "responses"),
        },
      },
    },
  };

  const { schema, fieldDefinitions } = await entityToSchema(
    payloadConfig,
    global,
  );
  const { example, examples } = global.custom?.openapi || {};

  const components: OpenAPIV3.ComponentsObject = {
    schemas: {
      [schemaName]: { ...schema, ...{ example, examples } },
      [`${schemaName}UpsertConfirmation`]: createUpsertConfirmationSchema(
        schemaName,
        singleItem,
      ),
      ...fieldDefinitions,
    },
    requestBodies: {
      [`${schemaName}Request`]: createRequestBody(schemaName),
    },
    responses: {
      [`${schemaName}Response`]: createResponse("ok", schemaName),
      [`${schemaName}UpsertConfirmationResponse`]: createResponse(
        "ok",
        `${schemaName}UpsertConfirmation`,
      ),
    },
  };

  const versionRoutes = await createVersionRoutes(
    global,
    options,
    payloadConfig,
  );
  const customRoutes = getCustomPaths(global, "global");

  return merge<Pick<Required<OpenAPIV3.Document>, "paths" | "components">>(
    { paths, components },
    versionRoutes,
    customRoutes,
  );
};
