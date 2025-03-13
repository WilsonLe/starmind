import { OpenAPIV3 } from "openapi-types";
import { Endpoint } from "payload";

export const collectionSpecificOpenApiEndpoint = ({
  pathStartsWith,
  includeAccessPaths = false,
  includeDuplicatePaths = false,
  includePreviewPaths = false,
  includeTrailingSlashPaths = false,
}: {
  pathStartsWith: string;
  includeAccessPaths?: boolean;
  includeDuplicatePaths?: boolean;
  includePreviewPaths?: boolean;
  includeTrailingSlashPaths?: boolean;
}): Endpoint => ({
  method: "get",
  path: "/openapi.json",
  handler: async (req) => {
    const paths = Object.keys(req.payload.openApiDoc.paths).reduce(
      (acc, path) => {
        if (path.startsWith(pathStartsWith)) {
          if (!includeAccessPaths && path.includes("/access")) {
            return acc;
          }
          if (!includeDuplicatePaths && path.includes("/duplicate")) {
            return acc;
          }
          if (!includePreviewPaths && path.includes("/preview")) {
            return acc;
          }
          if (!includeTrailingSlashPaths && path.endsWith("/")) {
            return acc;
          }
          acc[path] = req.payload.openApiDoc.paths[path];
        }
        return acc;
      },
      {} as OpenAPIV3.PathsObject<{}, {}>,
    );
    // actions are the top level keys of a path object
    const totalActions = Object.keys(paths).reduce((acc, path) => {
      const pathValue = paths[path];
      if (!pathValue) return acc;
      return acc + Object.keys(pathValue).length;
    }, 0);
    req.payload.logger.info(
      `Initiating "${pathStartsWith}" with ${Object.keys(paths).length} paths and ${totalActions} actions`,
    );
    return Response.json({ ...req.payload.openApiDoc, paths });
  },
});
